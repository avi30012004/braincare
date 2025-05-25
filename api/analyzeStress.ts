import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { testAnswers } = req.body;

  if (
    !testAnswers ||
    !Array.isArray(testAnswers) ||
    !testAnswers.every(answer => typeof answer === 'string')
  ) {
    return res.status(400).json({
      error: "Missing or invalid 'testAnswers' (array of strings) in request body.",
    });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error('Gemini API key not configured.');
    return res.status(500).json({ error: 'API key not configured.' });
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const prompt = `As an AI assistant specializing in mental well-being, please analyze the following answers from a stress assessment questionnaire. Based on these responses, determine the user's current stress level.

The user's answers are provided in an array:
${JSON.stringify(testAnswers)}

Provide your assessment strictly as a JSON object with the following keys:
- "stressLevel": A categorical stress level (e.g., "Low", "Moderate", "High", "Critical").
- "summary": A detaied summary of the stress level, explaining the basis for the stress level assessment, referencing key aspects of the user's answers.
- "recommendations": An array of 2-3 brief, actionable recommendations tailored to the assessed stress level.
- "academic class schedules": a academic class schedules for this student.
Do NOT include any markdown, comments, or additional explanations. Only return valid JSON.`;


  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error from Gemini API:', response.status, errorBody);
      return res.status(response.status).json({
        error: 'Error getting response from AI.',
        details: errorBody,
      });
    }

    const data = await response.json();
    let aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText || typeof aiResponseText !== 'string') {
      console.error('No valid AI response text:', data);
      return res.status(500).json({ error: 'No valid AI response text found.' });
    }

    // Clean code fences if present
    aiResponseText = aiResponseText
      .replace(/^```json\s*/i, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    // Extract only the JSON content from the response
    const jsonStart = aiResponseText.indexOf('{');
    const jsonEnd = aiResponseText.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('Could not locate valid JSON object in response:', aiResponseText);
      return res.status(500).json({
        error: 'AI response did not contain a valid JSON object.',
        rawResponse: aiResponseText,
      });
    }

    const cleanedJsonString = aiResponseText.slice(jsonStart, jsonEnd + 1);

    let parsedAiResponse;
    try {
      parsedAiResponse = JSON.parse(cleanedJsonString);
    } catch (parseError) {
      console.error('Failed to parse cleaned AI response as JSON:', parseError, cleanedJsonString);
      return res.status(500).json({
        error: 'Cleaned AI response was not valid JSON.',
        rawResponse: cleanedJsonString,
      });
    }

    return res.status(200).json({
      message: 'Stress test analysis successful.',
      stressAssessment: {
        input: testAnswers,
        result: parsedAiResponse,
      },
    });
  } catch (error: unknown) {
    console.error('Error in analyzeMood Vercel Function:', error);

    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as any).message
        : String(error);

    return res.status(500).json({
      error: 'Internal server error.',
      details: errorMessage,
    });
  }
}