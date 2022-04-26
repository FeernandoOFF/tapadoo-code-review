import React from 'react';
import styles from './InfoComponent.module.css';

function Info({ book }) {
  if (!book) return null;
  return (
    <div className={styles.container}>
      <h3 style={{ padding: '10px 30px' }}>{book.title} </h3>
      <h5 className={styles.subtitle}>{book.authors[0]} </h5>
      <div className={styles.descriptionContainer}>{book.description}</div>
    </div>
  );
}

export default Info;
