import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactForm.module.scss";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        "service_1vnpyld",
        "portfolio-template",
        formRef.current!,
        "oypc-KiXUrhpv25lH"
      );

      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds and close modal
      setTimeout(() => {
        setFormStatus(null);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Get in Touch</h2>
            <p className={styles.formSubtitle}>
              Fill out the form below and I'll get back to you as soon as
              possible.
            </p>
          </div>

          {formStatus === "success" && (
            <div className={styles.formSuccess}>
              <div className={styles.successIcon}>✓</div>
              <p>
                Thank you! Your message has been sent. I'll get back to you
                soon.
              </p>
            </div>
          )}

          {formStatus === "error" && (
            <div className={styles.formError}>
              <div className={styles.errorIcon}>!</div>
              <p>There was an error sending your message. Please try again.</p>
            </div>
          )}

          {formStatus !== "success" && (
            <form
              ref={formRef}
              className={styles.contactForm}
              onSubmit={handleSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="How can I help you?"
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <span className={styles.buttonArrow}>→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
