'use client';

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
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    console.log('=== EMAILJS DEBUG INFO ===');
    console.log('Service ID:', 'service_o96urzt');
    console.log('Template ID:', 'template_2qnktfp');
    console.log('Public Key:', 'tXJRf0CcFKcZWYALC');
    console.log('Sending email with params:', formData);

    try {
      const serviceId = 'service_o96urzt';
      const templateId = 'template_2qnktfp';
      const publicKey = 'tXJRf0CcFKcZWYALC';

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('=== EMAILJS SUCCESS ===');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('=== EMAILJS ERROR ===');
      console.error('EmailJS error details:', error);
      if (error.status) {
        console.error('Error status:', error.status);
      }
      if (error.text) {
        console.error('Error text:', error.text);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.sectionContainer} id="contact">
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h2>Get In Touch</h2>
          <p>
            Ready to protect your Cape Cod property with federal-level expertise? 
            Contact us today for a free consultation and let us show you why 
            reputation matters.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <div className={styles.icon}>
                <FaPhone />
              </div>
              <a href="tel:508-240-1708">508-240-1708</a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}>
                <FaEnvelope />
              </div>
              <a href="mailto:saltairpropertyservices@gmail.com">saltairpropertyservices@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}>
                <FaMapMarkerAlt />
              </div>
              <span>Cape Cod, Massachusetts</span>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className={styles.mapSection}>
            <h3 className={styles.mapTitle}>Proudly Serving Cape Cod</h3>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392000.0!2d-70.8!3d41.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f12.5!3m3!1m2!1s0x89e4cb7211111111%3A0x89e4cb7211111111!2sCape%20Cod%2C%20MA!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cape Cod Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.imageContainer}>
            <Image 
              src="/lighthouse.jpg" 
              alt="Cape Cod Lighthouse - Contact Salt Air Property Services" 
              fill 
              className={styles.contactImage}
              priority
            />
          </div>
          
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your property and how we can help..."
                  className={styles.textarea}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  Sorry, there was an error sending your message. Please try again or call us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
