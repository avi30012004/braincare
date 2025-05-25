import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { assessmentData, clerkUserId } = req.body;

  // Input validation
  if (!assessmentData || !Array.isArray(assessmentData) || !clerkUserId) {
    return res.status(400).json({ error: 'Missing or invalid assessmentData or clerkUserId.' });
  }

  // Prepare prompt
  let prompt = `
Analyze the following stress assessment answers from a college student.
Based on the answers, identify and provide:
- Overall Stress level (Low, Moderate, High, Critical)
- Summary of stress factors
- Actionable recommendations

Respond in strict JSON format with:
{
  "stressLevel": "string",
  "summary": "string",
  "recommendations": ["string", ...]
}. The 'summary' field should be a detailed breakdown of the identified stress factors, categorized (e.g., Academic, Social, Personal, Environmental), and the 'recommendations' should be specific and personalized based on the identified stress factors.

Answers:
`;

  assessmentData.forEach((item, index) => {
    prompt += `Question ${index + 1}: ${item.question}\nAnswer: ${item.answer}\n\n`;
  });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text().trim();

    // Clean markdown fences if present
    let cleanedText = rawText;
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/```$/, '').trim();
    }

    let geminiResponse;
    try {
      geminiResponse = JSON.parse(cleanedText);
    } catch (jsonError) {
      console.error('Failed to parse Gemini response as JSON:', cleanedText);
      return res.status(500).json({ error: 'Failed to parse Gemini response as JSON.', rawResponse: cleanedText });
    }

    // Validate JSON structure
    const { stressLevel, summary, recommendations } = geminiResponse;
    if (
      typeof stressLevel !== 'string' ||
      typeof summary !== 'string' ||
      !Array.isArray(recommendations)
    ) {
      console.error('Invalid response format:', geminiResponse);
      return res.status(500).json({ error: 'Invalid Gemini response format.', geminiResponse });
    }

    return res.status(200).json({ stressAssessment: { result: geminiResponse } });

  } catch (error) {
    console.error('Error analyzing stress:', error);
    return res.status(500).json({ error: 'Error analyzing stress.', details: error.message });
  }
}
