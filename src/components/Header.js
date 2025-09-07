'use client';

import styles from './Header.module.css';
import Logo from './Logo';

export default function Header() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height for offset
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Add extra offset for services section to position above "Why Choose Us" title
      const extraOffset = sectionId === 'services' ? 100 : 0;
      
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight - extraOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
