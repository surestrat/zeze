import { NextResponse } from 'next/server';
import { MessageService } from '@/lib/messages';
import { wishSchema } from '@/lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validation = wishSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid data', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, message } = validation.data;

    // Additional server-side validation
    if (name.trim().length < 2 || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Create the message
    const result = await MessageService.createMessage({
      name: name.trim(),
      message: message.trim(),
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Birthday wish submitted successfully!',
        data: result.data
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnapproved = searchParams.get('includeUnapproved') === 'true';

    let result;
    if (includeUnapproved) {
      // For admin use - get all messages
      result = await MessageService.getAllMessages();
    } else {
      // Public endpoint - only approved messages
      result = await MessageService.getApprovedMessages();
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        count: result.data.length
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error, data: [] },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', data: [] },
      { status: 500 }
    );
  }
}

// PATCH endpoint for approving messages (admin use)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { messageId, action } = body;

    if (!messageId || !action) {
      return NextResponse.json(
        { success: false, error: 'Message ID and action are required' },
        { status: 400 }
      );
    }

    let result;
    if (action === 'approve') {
      result = await MessageService.approveMessage(messageId);
    } else if (action === 'delete') {
      result = await MessageService.deleteMessage(messageId);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Message ${action}d successfully`,
        data: result.data
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
