import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <WhyChooseUs />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
