import { motion } from 'framer-motion';
import styles from './Modal.module.css';
export default function Modal({ book, setActive }) {
  console.log(book);
  return (
    <motion.div
      className={styles.background}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setActive(false)}
    >
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        className={styles.modal}
      >
        <h2> {book.title} </h2>
        <div style={{ display: 'flex', color: '#535353' }}>
          {book.authors.map((author) => (
            <p key={author} style={{ marginRight: 20 }}>
              {author}
            </p>
          ))}
        </div>
        <p> {book.description} </p>
      </motion.div>
    </motion.div>
  );
}
