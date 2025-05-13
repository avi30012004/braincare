import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '@clerk/backend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { userId } = auth({ req });

  if (!userId) {
    return res.status(401).json({ message: 'User is not authenticated.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { testAnswers } = req.body;

  if (!testAnswers || !Array.isArray(testAnswers) || !testAnswers.every(answer => typeof answer === 'string')) {
    return res.status(400).json({ error: "Missing or invalid 'testAnswers' (array of strings) in request body." });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("Gemini API key not configured.");
    return res.status(500).json({ error: "API key not configured." });
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const prompt = `As an AI assistant specializing in mental well-being, please analyze the following answers from a stress assessment questionnaire. Based on these responses, determine the user's current stress level.

  The user's answers are provided in an array:
  ${JSON.stringify(testAnswers)}

  Provide your assessment in a JSON object with the following keys:
  - "stressLevel": A categorical stress level (e.g., "Low", "Moderate", "High", "Critical").
  - "summary": A brief (2-3 sentences) summary explaining the basis for the stress level assessment, referencing key aspects of the user's answers.
  - "recommendations": An array of 2-3 brief, actionable recommendations tailored to the assessed stress level.`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // generation_config: {
        //   response_mime_type: "application/json", // Request JSON output directly if model supports
        // },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error from Gemini API:", response.status, errorBody);
      return res.status(response.status).json({ error: "Error getting response from AI.", details: errorBody });
    }

    const data = await response.json();
    const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      console.error("No response text found from Gemini API:", data);
      return res.status(500).json({ error: "No response text found from AI." });
    }

    let parsedAiResponse;
    try {
      parsedAiResponse = JSON.parse(aiResponseText);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError, aiResponseText);
      return res.status(500).json({ error: "AI response was not valid JSON.", rawResponse: aiResponseText });
    }

    res.status(200).json({
      message: `Stress test analysis successful for user: ${userId}`,
      stressAssessment: {
        input: testAnswers,
        result: parsedAiResponse, // This should be the JSON object { stressLevel, summary, recommendations }
      },
    });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error.";
    res.status(500).json({ error: "Error getting response from AI.", details: errorMessage });
  }
}
