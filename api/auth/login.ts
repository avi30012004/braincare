import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '@clerk/backend';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Use Clerk's auth() helper to get authentication information
  const { userId } = auth({ req });

  if (userId) {
    // If userId exists, the user is authenticated
    res.status(200).json({
      message: 'User is authenticated.',
      userId: userId,
    });
  } else {
    // If userId does not exist, the user is not authenticated
    res.status(401).json({
      message: 'User is not authenticated.',
    });
  }
}
