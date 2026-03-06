import React from "react";
import * as styles from './Logo.module.scss';


const IconLogo = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="#0a0a0f" stroke="#00d084" strokeWidth="1.2" />
    <circle cx="7" cy="7" r="2" fill="#00d084" />
  </svg>
);

const Logo = () => {
  return (
    <div className={styles.logoIcon}>
      <IconLogo />
    </div>
  );
};

export default Logo;
