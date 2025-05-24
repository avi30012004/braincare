// api/analyzeStress.js

import { Client, Databases, ID } from 'node-appwrite';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Raw request body:', req.body);
      console.log('Parsed request body:', req.body);
      const { assessmentData, clerkUserId } = req.body;
      console.log('Received assessmentData:', assessmentData);
      console.log('Received clerkUserId:', clerkUserId);

      // 1. Initialize the Appwrite client
      const client = new Client();
      client
        .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
        .setProject(process.env.VITE_APPWRITE_PROJECT_ID) // Your project ID
        .setKey(process.env.VITE_APPWRITE_API_KEY); // Your Appwrite API key

      const databases = new Databases(client);

      // 2. Validate and process the assessment data
      if (!assessmentData || !Array.isArray(assessmentData) || assessmentData.length === 0) {
        console.error('Invalid or missing assessment data in request body.');
        return res.status(400).json({ message: 'Invalid or missing assessment data.' });
      }

      // Optional: Validate clerkUserId if needed
      if (!clerkUserId) {
        console.warn('clerkUserId is missing in the request body.');
        // Depending on your requirements, you might want to return an error here
        return res.status(400).json({ message: 'Invalid or missing answers.' });
      }

      // 3. Call the Gemini API with the answers
      console.log('Calling Gemini API with answers:', answers);

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Construct a detailed prompt with questions and answers
      let prompt = `Analyze the following stress assessment data and provide a JSON response with the following structure: { "stressLevel": "low" | "moderate" | "high", "summary": "A brief summary of the stress level based on the provided answers", "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"] }.\n\nAssessment Data:\n`;
      assessmentData.forEach((item, index) => {
        prompt += `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${item.answer}\n`;
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      let analysisReport;
      try {
        analysisReport = JSON.parse(text);
        console.log('Gemini analysis report:', analysisReport);
      } catch (parseError) {
        console.error('Error parsing Gemini response as JSON:', parseError);
        // Handle cases where Gemini doesn't return perfect JSON
        analysisReport = { rawResponse: text, error: 'Failed to parse Gemini response as JSON' };
      };

      // 4. Store the Gemini analysis report in an Appwrite database collection
      // Add clerkUserId to the document to link it to the user
      const documentData = {
        clerkUserId: clerkUserId,
        ...analysisReport,
      };
      const collectionId = 'YOUR_APPWRITE_COLLECTION_ID'; // Replace with your actual collection ID
      const databaseId = 'YOUR_APPWRITE_DATABASE_ID'; // Replace with your actual database ID
      const document = await databases.createDocument(databaseId, collectionId, ID.unique(), documentData);

      res.status(200).json({ message: 'Analysis complete and report stored.', documentId: document.$id });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ message: 'Error processing request.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}