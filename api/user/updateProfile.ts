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

  // Placeholder for profile update data from the request body
  const { firstName, lastName, /* other updatable fields */ } = req.body;

  try {
    // Update user information using clerkClient
    // Ensure you only update fields that you intend to be updatable
    const updatedUser = await clerkClient.users.updateUser(userId, {
      firstName: firstName,
      lastName: lastName,
      // publicMetadata: { ... } // Example of updating metadata
    });

    res.status(200).json({
      message: 'User profile updated successfully.',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });
  } catch (error) {
    console.error('Error updating user profile in Clerk:', error);
    res.status(500).json({
      message: 'Internal server error while updating user profile.',
    });
  }
}
