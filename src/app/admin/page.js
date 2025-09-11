'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';

export default function AdminPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewAction = async (reviewId, action) => {
    try {
      const response = await fetch('/api/reviews/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          reviewId
        }),
      });

      if (response.ok) {
        // Refresh the reviews list
        fetchAllReviews();
        alert(`Review ${action}d successfully!`);
      } else {
        alert(`Failed to ${action} review`);
      }
    } catch (error) {
      console.error(`Error ${action}ing review:`, error);
      alert(`Error ${action}ing review`);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Management</h1>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reviews found.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{review.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            <FaCalendarAlt className="inline mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!review.verified && (
                        <>
                          <button
                            onClick={() => handleReviewAction(review.id, 'approve')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <FaCheck />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReviewAction(review.id, 'reject')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <FaTimes />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          ✓ Approved
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
