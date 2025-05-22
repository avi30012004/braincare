import { Client, Databases, ID } from 'node-appwrite';

export default async function main(context) {
  console.log('Incoming request context:', context);

  // ─── Enforce POST Method ────────────────────────────────
  if (context.req.method !== 'POST') {
    return context.res.json({ message: 'Only POST requests are allowed.' }, 405);
  }

  // ─── Parse & Validate Incoming Payload ───────────────────
  let payload;
  try {
    payload = JSON.parse(context.req.bodyRaw);
  } catch {
    return context.res.json({ error: 'Invalid JSON in request body.' }, 400);
  }

  const { testAnswers, clerkUserId } = payload;

  if (!Array.isArray(testAnswers) || !testAnswers.every(a => typeof a === 'string')) {
    return context.res.json({ error: "'testAnswers' must be an array of strings." }, 400);
  }

  if (!clerkUserId || typeof clerkUserId !== 'string') {
    return context.res.json({ error: "'clerkUserId' is required and must be a string." }, 400);
  }

  // ─── Validate Env Vars ──────────────────────────────────
  const {
    GEMINI_API_KEY,
    VITE_APPWRITE_ENDPOINT,
    VITE_APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    STRESS_ASSESSMENT_COLLECTION_ID,
  } = process.env;

  if (
    !GEMINI_API_KEY || !VITE_APPWRITE_ENDPOINT || !VITE_APPWRITE_PROJECT_ID ||
    !APPWRITE_API_KEY || !APPWRITE_DATABASE_ID || !STRESS_ASSESSMENT_COLLECTION_ID
  ) {
    return context.res.json({ error: 'Missing environment variables.' }, 500);
  }

  // ─── Prepare Gemini Prompt ──────────────────────────────
  const prompt = `As an AI assistant specializing in mental well-being, please analyze the \
following answers from a stress assessment questionnaire. Based on these responses, determine \
the user's current stress level.

The user's answers are provided in an array:
${JSON.stringify(testAnswers)}

Provide your assessment strictly as a JSON object with the following keys:
- "stressLevel": A categorical stress level (e.g., "Low", "Moderate", "High", "Critical").
- "summary": A detailed summary of the stress level.
- "recommendations": An array of 2-3 brief, actionable recommendations.
- "academic class schedules": an academic class schedule for this student.

Do NOT include markdown, comments, or extra text. Return only valid JSON.`

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // ─── Call Gemini API ────────────────────────────────────
  let aiRawText;
  try {
    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!res.ok) {
      const errText = await res.text();
      return context.res.json({ error: 'Gemini API error.', details: errText }, res.status);
    }

    const data = await res.json();
    aiRawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiRawText) {
      console.error('Gemini unexpected format:', JSON.stringify(data, null, 2));
      return context.res.json({ error: 'Unexpected Gemini response format.' }, 500);
    }
  } catch (err) {
    return context.res.json({ error: 'Failed to reach Gemini API.', details: err.message }, 500);
  }

  // ─── Clean + Parse Gemini Output ────────────────────────
  const cleanedText = aiRawText.trim().replace(/^```json|```$/g, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(cleanedText);
  } catch (err) {
    console.error('Failed to parse AI response:', cleanedText);
    return context.res.json({ error: 'AI response is not valid JSON.' }, 500);
  }

  const {
    stressLevel,
    summary,
    recommendations,
    ['academic class schedules']: academicClassSchedules
  } = parsed;

  if (
    typeof stressLevel !== 'string' ||
    typeof summary !== 'string' ||
    !Array.isArray(recommendations) ||
    typeof academicClassSchedules !== 'string'
  ) {
    return context.res.json({ error: 'Invalid AI response structure.' }, 500);
  }

  // ─── Save to Appwrite Database ──────────────────────────
  const client = new Client()
    .setEndpoint(VITE_APPWRITE_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    const doc = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      STRESS_ASSESSMENT_COLLECTION_ID,
      ID.unique(),
      {
        clerkUserId,
        stressLevel,
        summary,
        recommendations,
        academicClassSchedules,
        timestamp: new Date().toISOString()
      }
    );

    return context.res.json({
      success: true,
      message: 'Assessment saved successfully.',
      data: {
        stressLevel,
        summary,
        recommendations,
        academicClassSchedules
      }
    }, 200);
  } catch (err) {
    console.error('Appwrite DB write failed:', err);
    return context.res.json({ error: 'Failed to save assessment to database.' }, 500);
  }
}
