import { Client, Databases, ID } from 'node-appwrite';

export default async function main(context) {
  console.log('Full context object:', context);

  /* ─────────────────────── HTTP-method guard ─────────────────────── */
  if (context.req.method !== 'POST') {
    return context.res.json({ message: 'Only POST requests are allowed' }, 405);
  }

  /* ─────────────────────── Parse request body ─────────────────────── */
  let payload;
  try {
    payload = JSON.parse(context.req.bodyRaw);
  } catch {
    return context.res.json({ error: 'Invalid JSON in request body.' }, 400);
  }

  const { testAnswers, clerkUserId } = payload;

  /* ─────────────────────── Validate payload ─────────────────────── */
  if (
    !testAnswers ||
    !Array.isArray(testAnswers) ||
    !testAnswers.every(a => typeof a === 'string')
  ) {
    return context.res.json(
      { error: "Missing or invalid 'testAnswers' (array of strings) in request body." },
      400
    );
  }

  /* ─────────────────────── Env-var config ─────────────────────── */
  const {
    GEMINI_API_KEY,
    VITE_APPWRITE_ENDPOINT,
    VITE_APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    STRESS_ASSESSMENT_COLLECTION_ID
  } = process.env;

  if (
    !GEMINI_API_KEY ||
    !VITE_APPWRITE_ENDPOINT ||
    !VITE_APPWRITE_PROJECT_ID ||
    !APPWRITE_API_KEY ||
    !APPWRITE_DATABASE_ID ||
    !STRESS_ASSESSMENT_COLLECTION_ID
  ) {
    return context.res.json({ error: 'Missing one or more required environment variables.' }, 500);
  }

  /* ─────────────────────── Gemini prompt ─────────────────────── */
  const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/` +
    `gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `As an AI assistant specializing in mental well-being, please analyze the \
following answers from a stress assessment questionnaire. Based on these responses, determine \
the user's current stress level.

The user's answers are provided in an array:
${JSON.stringify(testAnswers)}

Provide your assessment strictly as a JSON object with the following keys:
- "stressLevel": A categorical stress level (e.g., "Low", "Moderate", "High", "Critical").
- "summary": A detailed summary of the stress level, explaining the basis for the stress level assessment.
- "recommendations": An array of 2-3 brief, actionable recommendations tailored to the assessed stress level.
- "academic class schedules": an academic class schedule for this student.

Do NOT include any markdown, comments, or extra text. Only return valid JSON.`;

  /* ─────────────────────── Call Gemini ─────────────────────── */
  let geminiResponse;
  try {
    geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
  } catch (err) {
    return context.res.json(
      { error: 'Failed to connect to Gemini API.', details: err.message },
      500
    );
  }

  if (!geminiResponse.ok) {
    const errorBody = await geminiResponse.text();
    return context.res.json(
      { error: 'Error from Gemini API.', details: errorBody },
      geminiResponse.status
    );
  }

  const geminiData = await geminiResponse.json();
  const aiResponseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiResponseText || typeof aiResponseText !== 'string') {
    return context.res.json({ error: 'Invalid AI response format.' }, 500);
  }

  /* ─────────────────────── Parse Gemini output ─────────────────────── */
  let parsed;
  try {
    parsed = JSON.parse(aiResponseText);
  } catch {
    return context.res.json({ error: 'AI response is not valid JSON.' }, 500);
  }

  const {
    stressLevel,
    summary,
    recommendations,
    ['academic class schedules']: academicClassSchedules
  } = parsed;

  if (!stressLevel || !summary || !recommendations || !academicClassSchedules) {
    return context.res.json({ error: 'AI response missing required fields.' }, 500);
  }

  /* ─────────────────────── Save to Appwrite DB ─────────────────────── */
  const client = new Client()
    .setEndpoint(VITE_APPWRITE_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    await databases.createDocument(
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

    return context.res.json(
      {
        stressAssessment: {
          result: { stressLevel, summary, recommendations, academicClassSchedules }
        },
        message: 'Assessment saved successfully.'
      },
      200
    );
  } catch (err) {
    console.error('Appwrite save error:', err);
    return context.res.json({ error: 'Failed to save data to Appwrite.' }, 500);
  }
}
