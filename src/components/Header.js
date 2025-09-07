'use client';

import styles from './Header.module.css';
import Logo from './Logo';

export default function Header() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />
        
        <nav className={styles.navigation}>
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

        <button className={styles.mobileMenuButton}>
          ☰
        </button>
      </div>
    </header>
  );
}
