'use client';

// Contact form component with EmailJS integration and Outer Cape service area focus
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '' // honeypot (leave empty)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic bot trap
    if (formData.website) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      await emailjs.send(
        'service_o96urzt',   // EmailJS service ID
        'template_2qnktfp',  // EmailJS template ID
        templateParams,
        'tXJRf0CcFKcZWYALC'  // EmailJS public key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.sectionContainer} id="contact" aria-labelledby="contact-heading">
      <div className={styles.container}>
        {/* Left: Info & Service Area */}
        <div className={styles.contactInfo}>
          <h2 id="contact-heading">Get in Touch</h2>
          <p>
            <strong>Proudly serving Outer Cape Cod.</strong><br />
            We serve all of Outer Cape Cod to deliver fast, reliable, high-quality service.
          </p>

          <div className={styles.contactDetails} aria-label="Contact details">
            <div className={styles.contactItem}>
              <div className={styles.icon}><FaPhone aria-hidden="true" /></div>
              <a href="tel:508-240-1708" aria-label="Call us at 508-240-1708">508-240-1708</a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}><FaEnvelope aria-hidden="true" /></div>
              <a href="mailto:saltairpropertyservices@gmail.com">saltairpropertyservices@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}><FaMapMarkerAlt aria-hidden="true" /></div>
              <span>Cape Cod, Massachusetts</span>
            </div>
          </div>

          {/* Service Area Map — zoomed to the Outer Cape */}
          <div className={styles.mapSection}>
            <h3 className={styles.mapTitle}>Service Area: Outer Cape Cod</h3>
            <div className={styles.mapContainer}>
              <iframe
                title="Cape Cod Service Area"
                src="https://www.google.com/maps?hl=en&q=Outer%20Cape%20Cod&ll=41.90,-70.05&z=10&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p style={{ marginTop: '0.5rem' }}>
              Towns served: <strong>Eastham, Wellfleet, Truro, and Provincetown</strong>.
            </p>
          </div>
        </div>

        {/* Right: Image & Form */}
        <div>
          <div className={styles.imageContainer}>
            <Image
              src="/lighthouse.jpg"
              alt="Outer Cape coastline and lighthouse"
              fill
              className={styles.contactImage}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(508) 123-4567"
                  className={styles.input}
                  inputMode="tel"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your Outer Cape property and how we can help..."
                  className={styles.textarea}
                  required
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>

              <div aria-live="polite" aria-atomic="true">
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    Thanks! Your message is in. We'll reply shortly (Cape Cod jobs).
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    Sorry—something went wrong. Please try again or call us at 508-240-1708.
                  </div>
                )}
              </div>
            </form>

            <p style={{ fontSize: '0.9rem', marginTop: '0.75rem', opacity: 0.8 }}>
              Need help outside Cape Cod? Contact us—we can recommend trusted partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
