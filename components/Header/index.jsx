import React from 'react';
import {
  AiFillNotification,
  AiOutlineMenu,
  AiOutlineNotification,
} from 'react-icons/ai';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftMenu}>
        <AiOutlineMenu />
      </div>
      <div className={styles.rightMenu}>
        <AiOutlineNotification />
        <div className={styles.avatar}></div>
      </div>
    </header>
  );
}

export default Header;
