'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaUser, FaCalendarAlt, FaThumbsUp, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styles from './Reviews.module.css';

export default function Reviews() {
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reviews from API on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sendReviewNotification = async (reviewData) => {
    try {
      const templateParams = {
        reviewer_name: reviewData.name,
        review_rating: reviewData.rating,
        review_comment: reviewData.comment,
        review_date: reviewData.date,
        review_id: reviewData.id,
        to_email: 'saltairpropertyservices@gmail.com',
        subject: 'New Review Submitted - Salt Air Property Services'
      };

      await emailjs.send(
        'service_o96urzt',   // EmailJS service ID
        'template_5pjhj6j',  // EmailJS template ID
        templateParams,
        'tXJRf0CcFKcZWYALC'  // EmailJS public key
      );

      console.log('Review notification email sent successfully');
    } catch (error) {
      console.error('Failed to send review notification email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit review to API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Send email notification
        const reviewData = {
          id: result.reviewId,
          name: newReview.name,
          rating: parseInt(newReview.rating),
          comment: newReview.comment,
          date: new Date().toISOString().split('T')[0]
        };
        
        await sendReviewNotification(reviewData);
        
        setNewReview({ name: '', rating: 5, comment: '' });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${styles.star} ${i < rating ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className={styles.sectionContainer} id="reviews" aria-labelledby="reviews-heading">
        <div className={styles.container}>
          <h2 id="reviews-heading" className={styles.sectionTitle}>
            What Our Clients Say
          </h2>
          <p className={styles.sectionSubtitle}>
            Loading reviews...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.sectionContainer} id="reviews" aria-labelledby="reviews-heading">
      <div className={styles.container}>
        <h2 id="reviews-heading" className={styles.sectionTitle}>
          What Our Clients Say
        </h2>
        <p className={styles.sectionSubtitle}>
          Trusted by Outer Cape property owners for exceptional service and peace of mind.
        </p>

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatar}>
                    <FaUser />
                  </div>
                  <div className={styles.reviewerDetails}>
                    <h4 className={styles.reviewerName}>{review.name}</h4>
                    <div className={styles.reviewMeta}>
                      <div className={styles.stars}>
                        {renderStars(review.rating)}
                      </div>
                      <div className={styles.reviewDate}>
                        <FaCalendarAlt className={styles.dateIcon} />
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {review.verified && (
                  <div className={styles.verifiedBadge}>
                    <FaThumbsUp />
                    Verified
                  </div>
                )}
              </div>
              
              <div className={styles.reviewContent}>
                <FaQuoteLeft className={styles.quoteIcon} />
                <p className={styles.reviewText}>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className={styles.addReviewSection}>
          <h3 className={styles.addReviewTitle}>Share Your Experience</h3>
          <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="rating" className={styles.label}>Rating</label>
                <div className={styles.ratingInput}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.ratingStar} ${i < newReview.rating ? styles.ratingStarActive : ''}`}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                    >
                      <FaStar />
                    </button>
                  ))}
                  <span className={styles.ratingText}>
                    {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="comment" className={styles.label}>Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Tell us about your experience with Salt Air Property Services..."
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <FaEnvelope className={styles.emailIcon} />
                Thank you for your review! We've sent you a confirmation email. Your review will appear on our website once approved.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                Sorry, there was an error submitting your review. Please try again or contact us directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
