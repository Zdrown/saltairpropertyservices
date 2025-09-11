import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');

// GET - Handle approve/reject from email buttons
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const reviewId = searchParams.get('reviewId');
    
    if (!action || !reviewId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    
    // Read existing reviews
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const reviews = JSON.parse(fileData);
    
    // Find and update the review
    const reviewIndex = reviews.findIndex(review => review.id === parseInt(reviewId));
    
    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    
    if (action === 'approve') {
      reviews[reviewIndex].verified = true;
      reviews[reviewIndex].pending = false;
    } else if (action === 'reject') {
      // Remove the review
      reviews.splice(reviewIndex, 1);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
    
    // Return HTML success page
    const successHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Review ${action === 'approve' ? 'Approved' : 'Rejected'}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .success { color: #10b981; font-size: 48px; margin-bottom: 20px; }
          .reject { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
          h1 { color: #1B3A4A; margin-bottom: 20px; }
          p { color: #666; margin-bottom: 30px; }
          .btn { display: inline-block; padding: 12px 24px; background: #6EA8B0; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="${action === 'approve' ? 'success' : 'reject'}">
            ${action === 'approve' ? '✓' : '✗'}
          </div>
          <h1>Review ${action === 'approve' ? 'Approved' : 'Rejected'}</h1>
          <p>The review has been ${action === 'approve' ? 'approved and is now visible on your website' : 'rejected and removed from the system'}.</p>
          <a href="https://your-website-url.com" class="btn">View Website</a>
        </div>
      </body>
      </html>
    `;
    
    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// POST - Approve or reject review (for programmatic use)
export async function POST(request) {
  try {
    const { action, reviewId } = await request.json();
    
    // Read existing reviews
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const reviews = JSON.parse(fileData);
    
    // Find and update the review
    const reviewIndex = reviews.findIndex(review => review.id === parseInt(reviewId));
    
    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    
    if (action === 'approve') {
      reviews[reviewIndex].verified = true;
      reviews[reviewIndex].pending = false;
    } else if (action === 'reject') {
      // Remove the review
      reviews.splice(reviewIndex, 1);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: `Review ${action}d successfully` 
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
