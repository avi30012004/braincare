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

  // Placeholder logic for fetchHistory endpoint (only accessible to authenticated users)
  // TODO: Add logic to fetch mood history from Firestore
  res.status(200).json({
    message: `Mood history fetched successfully for user: ${userId}`,
    history: [], // Placeholder for actual mood history data
  });
}
