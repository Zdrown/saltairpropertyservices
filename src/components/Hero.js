'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: '/heroimage3-new.jpg',
      alt: 'Professional Property Services',
      title: 'Professional Property Services',
      description: 'Trusted Cape Cod expertise for all your property management needs'
    },
    {
      src: '/heroimage2-cropped.jpg',
      alt: 'Salt Air Property Services',
      title: 'Salt Air Property Services',
      description: 'Your trusted partner in Cape Cod property management'
    },
    {
      src: '/heroimage1.jpg',
      alt: 'Comprehensive Maintenance',
      title: 'Comprehensive Maintenance',
      description: 'Complete property care and maintenance solutions'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentImage = images[currentSlide];

  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
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
      
      {/* Content below the carousel */}
      <div className={styles.content}>
        <h1 className={styles.title}>{currentImage.title}</h1>
        <p className={styles.description}>{currentImage.description}</p>
        <a href="#contact" className={styles.ctaButton}>Get in Touch</a>
      </div>
    </section>
  );
}
