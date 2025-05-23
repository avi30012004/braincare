import { Client, Functions } from "node-appwrite";
import axios from "axios";

// Initialize Appwrite client and database
const client = new Client();
const functions = new Functions(client);

export default async ({ req, res }) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error("❌ Missing GEMINI_API_KEY.");
      return res.send("Missing API key", 500);
    }

    const body = JSON.parse(req.body || "{}");
    const answers = Array.isArray(body.answers) ? body.answers : [];
    if (answers.length === 0) {
      console.error("❌ Invalid or empty 'answers' received.");
      return res.send("Invalid input", 400);
    }

    const cleanAnswers = answers.map((ans) =>
      ans.trim().replace(/[^\w\s]/gi, "")
    );

    console.log("✅ Cleaned Answers:", cleanAnswers);

    let geminiRes;
    try {
      geminiRes = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
        {
          contents: [
            {
              parts: [
                {
                  text: `These are user stress test answers: ${cleanAnswers.join(", ")}.
                Analyze them and return a JSON with: stressLevel (low|moderate|high), summary, and 3 recommendations.`
                }
              ]
            }
          ]
        }
      );
      console.log("✅ Gemini API call successful.");
    } catch (geminiError) {
      console.error("❌ Error calling Gemini API:", geminiError.message || geminiError);
      return res.send("Error analyzing answers with AI", 500);
    }

    const resultText = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("🎯 Gemini raw result:", resultText);

    let analysisResult = {};
    try {
      analysisResult = JSON.parse(resultText);
    } catch (err) {
      console.warn("⚠️ Could not parse Gemini response as JSON:", err.message || err);
      analysisResult = { message: resultText };
    }

    // Example database operation (replace with your actual database logic)
    // try {
    //   const databaseResult = await databases.createDocument(
    //     '[DATABASE_ID]',
    //     '[COLLECTION_ID]',
    //     'unique()', // or a specific document ID
    //     { answers: cleanAnswers, analysis: analysisResult }
    //   );
    //   console.log("✅ Database write successful.");
    // } catch (dbError) {
    //   console.error("❌ Error writing to database:", dbError.message || dbError);
    //   // Decide how to handle database write errors (e.g., return an error or continue)
    // }

    return res.json({
      success: true,
      answers: cleanAnswers,
      analysis: analysisResult,
    });

  } catch (error) {
    console.error("🔥 Unexpected error:", error);
    return res.send("Internal Server Error", 500);
  }
};
