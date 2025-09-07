'use client';

import Image from 'next/image';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/SaltAirLogo.png"
        alt="Salt Air Property Services"
        width={120}
        height={120}
        priority
        className={styles.logoImage}
      />
    </div>
  );
}
