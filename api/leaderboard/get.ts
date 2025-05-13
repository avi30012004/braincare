import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '@clerk/backend';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Use Clerk's auth() helper to get authentication information
  const { userId } = auth({ req });

  // Depending on your requirements, you might allow unauthenticated users to view the leaderboard
  // if (!userId) {
  //   return res.status(401).json({
  //     message: 'User is not authenticated.',
  //   });
  // }

  // Placeholder logic for get leaderboard endpoint
  // TODO: Add logic to retrieve leaderboard from Redis
  res.status(200).json({
    message: `Leaderboard fetched successfully. ${userId ? `Authenticated user: ${userId}` : 'Public view.'}`,
    leaderboard: [], // Placeholder for actual leaderboard data
  });
}
