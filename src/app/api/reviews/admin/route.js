import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');

// POST - Approve or reject review
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
