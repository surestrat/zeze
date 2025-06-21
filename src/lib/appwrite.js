import { Client, Databases, Account, ID, Query } from 'appwrite';

const client = new Client();

// Configure with environment variables for security
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id');

export const databases = new Databases(client);
export const account = new Account(client);

export { client, ID, Query };

// Database and Collection IDs from environment variables
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'birthday-db';
export const MESSAGES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'birthday-wishes';

// Admin authentication functions
export const adminAuth = {
  login: async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  checkSession: async () => {
    try {
      const session = await account.getSession('current');
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Collection schema for birthday wishes:
// - name (string, required)
// - message (string, required) 
// - timestamp (datetime, auto)
// - approved (boolean, default: false)
// - ip_address (string, optional for moderation)
