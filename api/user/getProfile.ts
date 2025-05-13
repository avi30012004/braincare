import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth, clerkClient } from '@clerk/backend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Use Clerk's auth() helper to get authentication information
  const { userId } = auth({ req });

  if (!userId) {
    // If userId does not exist, the user is not authenticated
    return res.status(401).json({
      message: 'User is not authenticated.',
    });
  }

  try {
    // If authenticated, fetch user information using clerkClient
    const user = await clerkClient.users.getUser(userId);

    // Return relevant user profile information
    res.status(200).json({
      message: 'User profile fetched successfully.',
      user: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress, // Assuming at least one email
        firstName: user.firstName,
        lastName: user.lastName,
        // Add other fields you need from the user object
        // metadata: user.publicMetadata, // Example of accessing metadata
      },
    });
  } catch (error) {
    console.error('Error fetching user profile from Clerk:', error);
    res.status(500).json({
      message: 'Internal server error while fetching user profile.',
    });
  }
}
