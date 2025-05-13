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

  // Placeholder logic for sendMessage endpoint (only accessible to authenticated users)
  // TODO: Add logic to post message to Firestore (and possibly Socket.IO integration)
  const { message } = req.body;
  res.status(200).json({
    message: `Message sent successfully by user: ${userId}`,
    sentMessage: message,
  });
}
