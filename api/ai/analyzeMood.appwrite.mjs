import { Client, Databases, ID } from 'node-appwrite';

export default async function main(context) {
  if (context.req.method !== 'POST') {
    context.res.json({ message: 'Only POST requests are allowed' }, 405);
    return;
  }

  let payload;
  try {
    payload = JSON.parse(context.req.bodyRaw);
  } catch {
    context.res.json({ error: 'Invalid JSON in request body.' }, 400);
    return;
  }

  const { testAnswers, clerkUserId } = payload;

  if (
    !testAnswers ||
    !Array.isArray(testAnswers) ||
    !testAnswers.every(answer => typeof answer === 'string')
  ) {
    context.res.json({
      error: "Missing or invalid 'testAnswers' (array of strings) in request body.",
    }, 400);
    return;
  }

  const {
    GEMINI_API_KEY,
    VITE_APPWRITE_ENDPOINT,
    VITE_APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    STRESS_ASSESSMENT_COLLECTION_ID,
  } = context.env;

  if (
    !GEMINI_API_KEY ||
    !VITE_APPWRITE_ENDPOINT ||
    !VITE_APPWRITE_PROJECT_ID ||
    !APPWRITE_API_KEY ||
    !APPWRITE_DATABASE_ID ||
    !STRESS_ASSESSMENT_COLLECTION_ID
  ) {
    context.res.json({ error: 'Missing environment variables.' }, 500);
    return;
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `As an AI assistant specializing in mental well-being, please analyze the following answers from a stress assessment questionnaire. Based on these responses, determine the user's current stress level.

The user's answers are provided in an array:
${JSON.stringify(testAnswers)}

Provide your assessment strictly as a JSON object with the following keys:
- "stressLevel": A categorical stress level (e.g., "Low", "Moderate", "High", "Critical").
- "summary": A detailed summary of the stress level, explaining the basis for the stress level assessment, referencing key aspects of the user's answers.
- "recommendations": An array of 2-3 brief, actionable recommendations tailored to the assessed stress level.
- "academic class schedules": an academic class schedule for this student.

Do NOT include any markdown, comments, or extra text. Only return valid JSON.`;

  let geminiResponse;
  try {
    geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
  } catch (error) {
    context.res.json({ error: 'Failed to connect to Gemini API.', details: error.message }, 500);
    return;
  }

  if (!geminiResponse.ok) {
    const errorBody = await geminiResponse.text();
    context.res.json({ error: 'Error from Gemini API.', details: errorBody }, geminiResponse.status);
    return;
  }

  const geminiData = await geminiResponse.json();
  const aiResponseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiResponseText || typeof aiResponseText !== 'string') {
    context.res.json({ error: 'Invalid AI response format.' }, 500);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(aiResponseText);
  } catch {
    context.res.json({ error: 'AI response is not valid JSON.' }, 500);
    return;
  }

  const stressLevel = parsed.stressLevel;
  const summary = parsed.summary;
  const recommendations = parsed.recommendations;
  const academicClassSchedules = parsed['academic class schedules'];

  if (!stressLevel || !summary || !recommendations || !academicClassSchedules) {
    context.res.json({ error: 'AI response missing required fields.' }, 500);
    return;
  }

  const client = new Client()
    .setEndpoint(VITE_APPWRITE_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    const savedDoc = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      STRESS_ASSESSMENT_COLLECTION_ID,
      ID.unique(),
      {
        clerkUserId,
        stressLevel,
        summary,
        recommendations,
        academicClassSchedules,
        timestamp: new Date().toISOString(),
      }
    );

    context.res.json({ message: 'Assessment saved successfully.', data: savedDoc }, 200);
  } catch (err) {
    console.error('Appwrite save error:', err);
    context.res.json({ error: 'Failed to save data to Appwrite.' }, 500);
  }
}
