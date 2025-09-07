import Image from 'next/image';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
  return (
    <section className={styles.sectionContainer} id="why-us">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Reputation Matters</h2>
        
        <div className={styles.contentGrid}>
          <div className={styles.imageContainer}>
            <Image
              src="/saltairhelicopter.JPG"
              alt="Federal Emergency Management Experience"
              fill
              className={styles.image}
            />
          </div>
          
          <div className={styles.textContent}>
            <h3>30+ Years of Federal Experience</h3>
            <p>
              With over three decades of service at <span className={styles.highlight}>FEMA</span> and the 
              <span className={styles.highlight}> Department of Homeland Security</span>, John McGough has 
              developed unparalleled expertise in emergency management, disaster response, and 
              crisis preparedness.
            </p>
            <p>
              This federal background brings a level of professionalism, attention to detail, 
              and systematic approach that sets Salt Air Property Services apart from typical 
              property management companies.
            </p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.number}>30+</div>
            <div className={styles.label}>Years Experience</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.number}>100%</div>
            <div className={styles.label}>Reliability</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.number}>24/7</div>
            <div className={styles.label}>Emergency Response</div>
          </div>
        </div>

        <div className={styles.secondContentGrid}>
          <div className={styles.textContent}>
            <h3>Trusted Cape Cod Expertise</h3>
            <p>
              John now brings the same reliability and precision from federal emergency management 
              to protecting and maintaining Cape Cod homes. Understanding the unique challenges of 
              coastal properties, from storm preparation to seasonal transitions.
            </p>
            <p>
              Our approach combines federal-level preparedness standards with local knowledge, 
              ensuring your property receives the highest level of care and protection year-round.
            </p>
          </div>
          
          <div className={styles.imageContainer}>
            <Image
              src="/heroimage1.jpg"
              alt="Cape Cod Property Management"
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
