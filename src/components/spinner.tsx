import React from "react";
import styles from "./spinner.module.css";

export default function MboxSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={`${styles.blob} ${styles.top}`}></div>
      <div className={`${styles.blob} ${styles.bottom}`}></div>
      <div className={`${styles.blob} ${styles.left}`}></div>

      <div className={`${styles.blob} ${styles.move_blob}`}></div>
    </div>
  );
}
