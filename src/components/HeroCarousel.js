'use client';

import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [
    {
      id: 1,
      title: "Emergency Response",
      description: "30+ years of federal emergency management expertise",
      icon: "🚁",
      background: "var(--charcoal)"
    },
    {
      id: 2,
      title: "Coastal Protection",
      description: "Specialized care for Cape Cod homes in all weather conditions",
      icon: "🏖️",
      background: "var(--moonstone)"
    },
    {
      id: 3,
      title: "Year-Round Service",
      description: "Comprehensive property management from opening to closing",
      icon: "🏠",
      background: "var(--drab-dark-brown)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {carouselImages.map((image, index) => (
          <div 
            key={image.id} 
            className={`${styles.carouselSlide} ${index === currentIndex ? styles.active : ''}`}
            style={{ 
              backgroundColor: image.background
            }}
          >
            <div className={styles.slideContent}>
              <div className={styles.slideIcon}>{image.icon}</div>
              <h3 className={styles.slideTitle}>{image.title}</h3>
              <p className={styles.slideDescription}>{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        className={styles.prevArrow}
        onClick={goToPrevious}
        disabled={carouselImages.length <= 1}
      >
        ‹
      </button>
      
      <button 
        className={styles.nextArrow}
        onClick={goToNext}
        disabled={carouselImages.length <= 1}
      >
        ›
      </button>

      <div className={styles.navigationDots}>
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
