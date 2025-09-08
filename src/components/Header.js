'use client';

import { useState } from 'react';
import styles from './Header.module.css';
import Logo from './Logo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height for offset
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Add small offset for services section to position just above "Why Choose Us" title
      const extraOffset = sectionId === 'services' ? 20 : 0;
      
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight - extraOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />
        
        <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.open : ''}`}>
          <a 
            className={styles.navLink}
            onClick={() => scrollToSection('why-us')}
            style={{ cursor: 'pointer' }}
          >
            Why Us
          </a>
          <a 
            className={styles.navLink}
            onClick={() => scrollToSection('services')}
            style={{ cursor: 'pointer' }}
          >
            Services
          </a>
          <a 
            className={styles.navLink}
            onClick={() => scrollToSection('contact')}
            style={{ cursor: 'pointer' }}
          >
            Contact
          </a>
        </nav>

        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line1 : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line2 : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line3 : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
