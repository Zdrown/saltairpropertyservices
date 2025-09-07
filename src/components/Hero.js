'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: '/heroimage1.jpg',
      alt: 'Professional Property Services',
      title: 'Professional Property Services',
      description: 'Trusted Cape Cod expertise for all your property management needs'
    },
    {
      src: '/heroimage2.jpg',
      alt: 'Salt Air Property Services',
      title: 'Salt Air Property Services',
      description: 'Your trusted partner in Cape Cod property management'
    },
    {
      src: '/heroimage3.jpg',
      alt: 'Comprehensive Maintenance',
      title: 'Comprehensive Maintenance',
      description: 'Complete property care and maintenance solutions'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
        <div className={styles.slideContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className={styles.heroImage}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.navigationDots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      {/* Content section below the carousel */}
      <div className={styles.content}>
        <h1 className={styles.title}>{images[currentSlide].title}</h1>
        <p className={styles.description}>{images[currentSlide].description}</p>
        <a href="#contact" className={styles.ctaButton}>Get in Touch</a>
      </div>
    </section>
  );
}
