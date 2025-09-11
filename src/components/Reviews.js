'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaUser, FaCalendarAlt, FaThumbsUp } from 'react-icons/fa';
import styles from './Reviews.module.css';

export default function Reviews() {
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Default sample reviews
  const defaultReviews = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      rating: 5,
      comment: 'Salt Air Property Services exceeded our expectations! Their attention to detail and professionalism during our home opening was outstanding. Highly recommend for Outer Cape property owners.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      comment: 'Rapid emergency response when we had storm damage. They were on-site within hours and handled everything professionally. True Outer Cape specialists.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 5,
      comment: 'From seasonal transitions to regular maintenance, Salt Air has been our trusted partner for years. Their knowledge of Outer Cape properties is unmatched.',
      date: '2023-12-22',
      verified: true
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 5,
      comment: 'Professional, reliable, and thorough. They understand the unique challenges of Outer Cape properties and deliver exceptional service every time.',
      date: '2023-12-10',
      verified: true
    }
  ];

  // Load reviews from localStorage on component mount
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = localStorage.getItem('saltAirReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('saltAirReviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call delay
    setTimeout(() => {
      const review = {
        id: Date.now(),
        name: newReview.name,
        rating: parseInt(newReview.rating),
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        verified: false
      };
      
      // Add new review to the beginning of the array
      setReviews(prev => [review, ...prev]);
      setNewReview({ name: '', rating: 5, comment: '' });
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 1000);
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
                {!review.verified && (
                  <div className={styles.pendingBadge}>
                    Pending
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
                Thank you for your review! It has been added and will be visible immediately.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
