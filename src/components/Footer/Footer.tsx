import React, { useState } from "react";
import styles from "./Footer.module.scss";
import ContactForm from "../ContactForm/ContactForm";

const Footer: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2023 Illia Rozhok. All rights reserved.</p>
        <button className={styles.contactButton} onClick={handleContactClick}>
          Contact Me
        </button>
      </div>
      {isContactModalOpen && (
        <ContactForm isOpen={isContactModalOpen} onClose={handleCloseModal} />
      )}
    </footer>
  );
};

export default Footer;
