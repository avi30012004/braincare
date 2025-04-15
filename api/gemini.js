// api/gemini.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, userId } = req.body;
    const geminiApiKey = process.env.GEMINI_API_KEY; // From Vercel environment variables

    if (!geminiApiKey) {
      return res.status(500).json({ error: "Gemini API key not configured." });
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          // We're not currently using userId in the Gemini prompt, but it's 
          // included in the request body for potential future use.
          // You could add something like:
          //   safety_settings: [{
          //     category: 'HARM_CATEGORY_DANGEROUS',
          //     threshold: 'BLOCK_NONE',
          //   }],          
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API error:", response.status, errorBody);
        throw new Error(`Gemini API error: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ response: aiResponse });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return res.status(500).json({ error: "Error getting response from AI." });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}