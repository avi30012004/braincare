import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { assessmentData, clerkUserId } = req.body;

  // Basic validation
  if (!assessmentData || !Array.isArray(assessmentData) || !clerkUserId) {
    return res.status(400).json({ error: 'Missing or invalid assessmentData or clerkUserId.' });
  }

  // Construct prompt
  let prompt = `
Analyze the following stress assessment answers from a college student.
Return:
- stressLevel: (Low, Moderate, High, Critical)
- summary: Brief explanation of their stress
- recommendations: Practical suggestions in array form

Respond ONLY in this JSON format:

{
  "stressLevel": "string",
  "summary": "string",
  "recommendations": ["string", ...]
}

Answers:
`;

  assessmentData.forEach((item: { question: string; answer: string }, index: number) => {
    prompt += `Q${index + 1}: ${item.question}\nA: ${item.answer}\n\n`;
  });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text().trim();

    // Clean markdown fences if they exist
    let cleanedText = rawText;
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/```$/, '').trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error('Gemini returned invalid JSON:', cleanedText);
      return res.status(500).json({ error: 'Failed to parse Gemini response as JSON.', rawResponse: cleanedText });
    }

    const { stressLevel, summary, recommendations } = parsed;

    if (
      typeof stressLevel !== 'string' ||
      typeof summary !== 'string' ||
      !Array.isArray(recommendations)
    ) {
      console.error('Gemini returned unexpected structure:', parsed);
      return res.status(500).json({ error: 'Unexpected structure from Gemini.', geminiResponse: parsed });
    }

    return res.status(200).json({
      stressAssessment: {
        clerkUserId,
        result: parsed
      }
    });

  } catch (err: any) {
    console.error('Error during Gemini processing:', err);
    return res.status(500).json({ error: 'Error during stress analysis.', details: err.message });
  }
}
