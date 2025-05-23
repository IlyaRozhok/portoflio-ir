import React, { useState, useRef } from "react";
import gsap from "gsap";
import HomePage from "./pages/HomePage/HomePage";
import Works from "./pages/Works/Works";
import Approach from "./pages/Approach/Approach";
import ContactForm from "./components/ContactForm/ContactForm";
import InteractiveBackground from "./components/InteractiveBackground/InteractiveBackground";

import "./index.css";

function App() {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const contactModalRef = useRef<HTMLDivElement>(null);
  const contactOverlayRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    setIsContactFormVisible(true);

    console.log(isContactFormVisible);
    // Use setTimeout to ensure the elements are mounted before animating
  };

  const handleCloseContact = () => {
    if (contactModalRef.current && contactOverlayRef.current) {
      gsap.to(contactModalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });

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

        <section id="approach">
          <Approach />
        </section>

        <section id="works">
          <Works />
        </section>

        {/* Neon section separator */}
        <div className="neon-separator">
          <div className="neon-line neon-blue"></div>
          <div className="neon-line neon-purple"></div>
          <div className="neon-line neon-pink"></div>
        </div>

        <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-center sm:justify-between px-8 sm:px-16 py-8 text-sm text-white border-t border-gray-800 bg-black bg-opacity-60 backdrop-filter backdrop-blur-md">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} Illia Rozhok. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/IlyaRozhok"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ilya-rozhok/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </footer>

        {isContactFormVisible && (
          <div
            ref={contactOverlayRef}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            style={{ opacity: 0 }}
            onClick={handleCloseContact}
          >
            <div
              ref={contactModalRef}
              className="w-full max-w-[550px] relative bg-[#0f0f19] rounded-2xl p-6"
              style={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white text-2xl hover:text-purple-400 transition-colors"
                onClick={handleCloseContact}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
