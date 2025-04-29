import React from 'react';
import styles from './ScrollContainer.module.scss';

interface ScrollContainerProps {
  children: React.ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
  return (
    <div className={styles.scrollContainer}>
      {children}
    </div>
  );
};

export default ScrollContainer; 