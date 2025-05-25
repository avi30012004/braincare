const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { assessmentData, clerkUserId } = req.body;

  // Basic data validation
  if (!assessmentData || !Array.isArray(assessmentData) || !clerkUserId) {
    return res.status(400).json({ error: 'Missing or invalid assessmentData or clerkUserId in request body.' });
  }

  // Construct the prompt for the Gemini API
  let prompt = "Analyze the following stress assessment answers from a college student and provide a stress level (Low, Moderate, High, Critical), a summary of their stress factors, and actionable recommendations to manage their stress. Provide the response in a JSON format with the keys 'stressLevel', 'summary', and 'recommendations' (an array of strings). Do not include any other text outside the JSON.\n\nStress Assessment Answers:\n";

  assessmentData.forEach((item, index) => {
    prompt += `Question ${index + 1}: ${item.question}\n`;
    prompt += `Answer: ${item.answer}\n\n`;
  });

  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content using the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Attempt to parse the JSON response from Gemini
    let geminiResponse;
    try {
      geminiResponse = JSON.parse(text);
    } catch (jsonError) {
      console.error('Failed to parse Gemini response as JSON:', text, jsonError);
      return res.status(500).json({ error: 'Failed to parse Gemini response as JSON.', rawResponse: text });
    }

    // Validate the structure of the Gemini response
    if (!geminiResponse || typeof geminiResponse.stressLevel !== 'string' || typeof geminiResponse.summary !== 'string' || !Array.isArray(geminiResponse.recommendations)) {
         console.error('Unexpected Gemini response structure:', geminiResponse);
         return res.status(500).json({ error: 'Unexpected response structure from Gemini.', geminiResponse });
    }


    // Return the stress assessment report
    res.status(200).json({ stressAssessment: { result: geminiResponse } });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Error analyzing stress.', details: error.message });
  }
};