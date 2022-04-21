import React from 'react';
import styles from './BookComponent.module.css';

function BookComponent({ children, book, active, setActive }) {
  if (!book?.title) return null;
  return (
    <div
      className={`${styles.container} ${active ? styles.containerActive : ''}`}
      onClick={setActive}
    >
      <img
        src={book?.imageLinks?.thumbnail}
        alt=""
        className={styles.bookImage}
      />
      {/* <h4>{book?.title} </h4> */}
      {/* <span className={styles.bookPrice}> {book.price} </span> */}
    </div>
  );
}

export default BookComponent;
