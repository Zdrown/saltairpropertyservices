'use client';

import { FaFacebook, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Navigation</h3>
          <nav className={styles.navigation}>
            <a 
              className={styles.navLink}
              onClick={() => scrollToSection('why-us')}
              style={{ cursor: 'pointer' }}
            >
              Why Choose Us
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
        </div>

        <div className={styles.footerSection}>
          <h3>Contact Info</h3>
          <div className={styles.contactInfo}>
            <p><FaPhone /> <a href="tel:508-240-1708">508-240-1708</a></p>
            <p>✉️ <a href="mailto:saltairpropertyservices@gmail.com">saltairpropertyservices@gmail.com</a></p>
            <p><FaMapMarkerAlt /> Cape Cod, Massachusetts</p>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <p>Stay updated with tips and Cape Cod home insights</p>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/saltairpropertyservices" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/saltairpropertyservices" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; 2025 Salt Air Property Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
