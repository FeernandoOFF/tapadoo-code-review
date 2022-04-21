import React from 'react';
import styles from './BottomMenu.module.css';

function BottomMenu({ book }) {
  if (!book) return null;
  return (
    <div className={styles.mainMenu}>
      <a
        href={book.previewLink}
        className={`${styles.button} ${styles.whiteButton}`}
      >
        Sample
      </a>
      <button className={styles.button}>Buy Now</button>
    </div>
  );
}

export default BottomMenu;
