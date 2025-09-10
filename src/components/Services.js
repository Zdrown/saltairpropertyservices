'use client';

import { FaHome, FaShieldAlt, FaTools, FaKey, FaEye, FaWrench } from 'react-icons/fa';
import styles from './Services.module.css';

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: 1,
      title: "Trusted On and Off-Season Care",
      description: "Comprehensive year-round property management ensuring your Cape Cod home is protected in all seasons.",
      icon: FaHome
    },
    {
      id: 2,
      title: "Storm Preparation & Emergency Response",
      description: "Expert storm preparation and rapid emergency response using federal-level disaster management protocols.",
      icon: FaShieldAlt
    },
    {
      id: 3,
      title: "Maintenance Services",
      description: "Regular maintenance and upkeep to keep your property in pristine condition throughout the year.",
      icon: FaTools
    },
    {
      id: 4,
      title: "Home Opening and Closing",
      description: "Professional seasonal transitions with comprehensive property assessments.",
      icon: FaKey
    },
    {
      id: 5,
      title: "Home Check-in Service",
      description: "Regular property inspections and check-ins to ensure everything is secure and functioning properly.",
      icon: FaEye
    },
    {
      id: 6,
      title: "Repairs and Restoration",
      description: "Expert repair services and restoration work to maintain and enhance your property's value.",
      icon: FaWrench
    }
  ];

  return (
    <section className={styles.sectionContainer} id="services">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What We Offer</h2>
        <p className={styles.sectionSubtitle}>
          Comprehensive property services designed to protect and maintain your Cape Cod home 
          with the same level of expertise and reliability you'd expect from federal emergency management.
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <IconComponent />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            );
          })}
        </div>

        <button className={styles.ctaButton} onClick={scrollToContact}>
          Get Your Free Consultation
        </button>
      </div>
    </section>
  );
}
