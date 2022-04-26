import { motion } from 'framer-motion';
import React from 'react';
import styles from './BookComponent.module.css';

const itemVariants = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
const swipeConfidenceThreshold = 10000;

function BookComponent({ children, book, active, paginate }) {
  if (!book?.title || !active) return null;
  return (
    <motion.div
      className={`${styles.container} ${active ? styles.containerActive : ''}`}
      variants={itemVariants}
      animate="visible"
      exit="exit"
      initial="hidden"
      dragConstraints={{ right: 100, left: 100 }}
      drag="x"
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          paginate(0);
        }
      }}
    >
      <img
        src={book?.imageLinks?.thumbnail}
        alt=""
        className={`${styles.bookImage} ${
          active ? styles.bookImageActive : ''
        }`}
      />
    </motion.div>
  );
}

export default BookComponent;
