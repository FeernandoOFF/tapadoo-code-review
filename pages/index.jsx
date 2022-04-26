import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from 'react-icons/ai';
// Own Components
import styles from '../styles/Home.module.css';
import { findOneBook, getBooks } from '../utils/api';
import Info from '../components/InfoComponent';
import BookComponent from '../components/BookComponent';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import Modal from '../components/Modal';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [active, setActive] = useState(0);
  const [bookActive, setBookActive] = useState(null);
  const [overviewActive, setoverviewActive] = useState(false);

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
  useEffect(() => {
    if (!active || !books) return;
    setBookActive(books.find((book, i) => i === active));
  }, [active, books]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tapadoo Books | Fernando Obregon</title>
      </Head>

      <Header />

      <div className={styles.bookContainer}>
        <Arrow
          className={styles.prevButton}
          onClick={() => paginate(0)}
          disabled={active === 0}
        >
          <AiOutlineArrowLeft />
        </Arrow>
        <Arrow
          className={styles.nextButton}
          onClick={() => paginate(1)}
          disabled={books.length - 1 === active}
        >
          <AiOutlineArrowRight />
        </Arrow>
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
      <motion.div
        whileHover={{ y: -20 }}
        className={styles.seeMore}
        onClick={() => setoverviewActive(true)}
      >
        <AiOutlineArrowUp />
        <p>See More</p>
      </motion.div>

      {overviewActive && (
        <Modal setActive={setoverviewActive} book={bookActive} />
      )}
    </div>
  );
}

function Arrow({ children, onClick, className, disabled }) {
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      className={`${className} ${disabled ? styles.disabledArrow : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
