import { Client, Databases } from 'node-appwrite';

// Replace with your actual Appwrite Endpoint and Project ID
const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT; // Or your specific endpoint if not using environment variables
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID; // Or your specific project ID if not using environment variables

if (!ENDPOINT || !PROJECT_ID) {
  console.error('Appwrite Endpoint and Project ID must be provided as environment variables.');
  // Depending on your application's needs, you might want to throw an error here
  // throw new Error('Appwrite configuration missing.');
}

const client = new Client();

client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID); // Your projectID

const databases = new Databases(client);

export { databases };