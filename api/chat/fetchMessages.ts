import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '@clerk/backend';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Use Clerk's auth() helper to get authentication information
  const { userId } = auth({ req });

  if (!userId) {
    // If userId does not exist, the user is not authenticated
    return res.status(401).json({
      message: 'User is not authenticated.',
    });
  }

  // Placeholder logic for fetchMessages endpoint (only accessible to authenticated users)
  // TODO: Add logic to fetch chat history from Firestore
  const { roomId } = req.query; // Assuming room ID is passed as a query parameter
  res.status(200).json({
    message: `Messages fetched successfully for room: ${roomId} by user: ${userId}`,
    messages: [], // Placeholder for actual chat messages
  });
}
