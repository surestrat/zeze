import { databases, DATABASE_ID, MESSAGES_COLLECTION_ID, ID } from './appwrite';
import { Query } from 'appwrite';

export class MessageService {
  // Create a new birthday wish
  static async createMessage(messageData) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        {
          name: messageData.name,
          message: messageData.message,
          timestamp: new Date().toISOString(),
          approved: false, // Messages need approval by default
        }
      );
      return { success: true, data: document };
    } catch (error) {
      console.error('Error creating message:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all approved messages
  static async getApprovedMessages() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        [
          Query.equal('approved', true)
        ],
        100, // Limit to 100 messages
        0, // Offset
        undefined, // Cursor (not used)
        undefined, // Cursor direction (not used)
        [Query.orderDesc('timestamp')] // Order by timestamp (newest first)
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  // Get all messages (for admin/moderation)
  static async getAllMessages() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        [],
        100, // Limit to 100 messages
        0, // Offset
        undefined, // Cursor (not used)
        undefined, // Cursor direction (not used)
        [Query.orderDesc('timestamp')] // Order by timestamp (newest first)
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching all messages:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  // Approve a message (for admin use)
  static async approveMessage(messageId) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        messageId,
        { approved: true }
      );
      return { success: true, data: document };
    } catch (error) {
      console.error('Error approving message:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a message (for admin use)
  static async deleteMessage(messageId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        messageId
      );
      return { success: true };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, error: error.message };
    }
  }
}

export default MessageService;
