import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

// Own Components
import styles from '../styles/Home.module.css';
import { getBooks } from '../utils/api';
import Info from '../components/InfoComponent';
import BookComponent from '../components/BookComponent';
import BottomMenu from '../components/BottomMenu';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [active, setActive] = useState(0);

  const getInitialBooks = () => {
    getBooks().then((books) => {
      // Some books come with no title. We need to filter them out
      let filteredBooks = books.filter((book) => (book?.title ? book : null));
      setBooks(filteredBooks);
    });
  };

  // This function pass to the next book without the need of sending extra props
  const paginate = (direction) => {
    if (direction === 1 && active < books.length - 1) setActive(++active);
    if (direction === 0 && active > 0) setActive(--active);
  };

  /*
   ** Get the books from the API on the first render
   */
  useEffect(() => {
    getInitialBooks();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tapadoo Books | Fernando Obregon</title>
      </Head>

      <h1 className={styles.title}>Tapadoo Books</h1>

      <div className={styles.bookContainer}>
        <div className={styles.prevButton} onClick={() => paginate(0)}>
          {'<'}
        </div>
        <div className={styles.nextButton} onClick={() => paginate(1)}>
          {'>'}
        </div>
        <AnimatePresence initial={false}>
          {books?.map((book, i) => (
            <BookComponent
              key={i}
              book={book}
              active={i === active}
              paginate={paginate}
            />
          ))}
        </AnimatePresence>
      </div>
      <Info book={books.find((book, i) => i === active)} />
      <BottomMenu book={books.find((_, i) => i === active)} />
    </div>
  );
}
