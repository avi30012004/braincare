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

  // Placeholder logic for update leaderboard endpoint (only accessible to authenticated users)
  // TODO: Add logic to push scores to Redis
  // This might be an admin-only endpoint or triggered by specific game actions
  res.status(200).json({
    message: `Leaderboard update triggered by user: ${userId}`,
  });
}
