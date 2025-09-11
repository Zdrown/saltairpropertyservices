import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');

// GET - Fetch all reviews
export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const reviews = JSON.parse(fileData);
    
    // Only return verified reviews for public display
    const verifiedReviews = reviews.filter(review => review.verified === true);
    
    return NextResponse.json(verifiedReviews);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST - Add new review
export async function POST(request) {
  try {
    const newReview = await request.json();
    
    // Read existing reviews
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const reviews = JSON.parse(fileData);
    
    // Add new review with pending status
    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      pending: true
    };
    
    // Add to beginning of array
    reviews.unshift(review);
    
    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully',
      reviewId: review.id 
    });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
