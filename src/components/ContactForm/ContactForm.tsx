import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactForm.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formContainerRef.current) {
      gsap.fromTo(
        formContainerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      return;
    }

    // Simulating form submission - in a real scenario you would send the data to a server
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className={styles.formContainer} ref={formContainerRef}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Get in Touch</h2>
        <p className={styles.formSubtitle}>
          Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>

      {formStatus === "success" && (
        <div className={styles.formSuccess}>
          <div className={styles.successIcon}>✓</div>
          <p>
            Thank you! Your message has been sent. I'll get back to you soon.
          </p>
        </div>
      )}

      {formStatus === "error" && (
        <div className={styles.formError}>
          <div className={styles.errorIcon}>!</div>
          <p>Please fill out all fields before submitting.</p>
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
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
            <span className={styles.buttonArrow}>→</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
