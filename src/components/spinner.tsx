import React from "react";
import styles from "./spinner.module.css";

interface MboxSpinnerProps {
  top?: `${number}%}`;
}

export default function MboxSpinner({ top = '180%'}) {
  return (
    <div className={styles.spinner} style={{top}}>
      <div className={`${styles.blob} ${styles.top}`}></div>
      <div className={`${styles.blob} ${styles.bottom}`}></div>
      <div className={`${styles.blob} ${styles.left}`}></div>

      <div className={`${styles.blob} ${styles.move_blob}`}></div>
    </div>
  );
}
