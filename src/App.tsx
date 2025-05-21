import React, { useState, useRef } from "react";
import HomePage from "./pages/HomePage/HomePage";
import Works from "./pages/Works/Works";
import Approach from "./pages/Approach/Approach";
import ContactForm from "./components/ContactForm/ContactForm";
import InteractiveBackground from "./components/InteractiveBackground/InteractiveBackground";
import { gsap } from "gsap";
import "./index.css";

function App() {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const contactModalRef = useRef<HTMLDivElement>(null);
  const contactOverlayRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    setIsContactFormVisible(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open

    if (contactModalRef.current && contactOverlayRef.current) {
      // Animate the overlay
      gsap.to(contactOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate the contact form
      gsap.fromTo(
        contactModalRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: "power3.out" }
      );
    }
  };

  const handleCloseContact = () => {
    if (contactModalRef.current && contactOverlayRef.current) {
      // Animate the contact form out
      gsap.to(contactModalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });

      // Animate the overlay out
      gsap.to(contactOverlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          setIsContactFormVisible(false);
          document.body.style.overflow = ""; // Re-enable scrolling
        },
      });
    }
  };

  return (
    <>
      <InteractiveBackground />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="content-overlay"></div>

        <section id="home">
          <HomePage onContactClick={handleContactClick} />
        </section>

        {/* Neon section separator */}
        <div className="neon-separator">
          <div className="neon-line neon-purple"></div>
          <div className="neon-line neon-blue"></div>
          <div className="neon-line neon-cyan"></div>
        </div>

        <section id="approach">
          <Approach />
        </section>

        {/* Neon section separator */}
        <div className="neon-separator">
          <div className="neon-line neon-cyan"></div>
          <div className="neon-line neon-pink"></div>
          <div className="neon-line neon-purple"></div>
        </div>

        <section id="works">
          <Works />
        </section>

        {/* Neon section separator */}
        <div className="neon-separator">
          <div className="neon-line neon-blue"></div>
          <div className="neon-line neon-purple"></div>
          <div className="neon-line neon-pink"></div>
        </div>

        <footer className="relative z-20 flex items-center justify-between px-16 py-6 text-xs text-gray-500 border-t border-gray-800 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">ENG</span>
            <span className="mx-1">/</span>
            <span>UA</span>
          </div>
          <div>© Designed by Illia Rozhok</div>
          <span className="tracking-widest text-xs text-gray-400">
            INNOVATION | SOCIAL
          </span>
        </footer>

        {/* Contact Form Modal */}
        {isContactFormVisible && (
          <>
            <div
              ref={contactOverlayRef}
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
              style={{ opacity: 0 }}
              onClick={handleCloseContact}
            >
              <div
                ref={contactModalRef}
                className="w-full max-w-[550px] relative"
                style={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white text-2xl hover:text-purple-400 transition-colors"
                  onClick={handleCloseContact}
                >
                  ✕
                </button>
                <ContactForm />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
