import React from "react";
import styles from "./GlowingText.module.scss";

interface GlowingTextProps {
  text: string;
}

const GlowingText: React.FC<GlowingTextProps> = ({ text }) => {
  return (
    <div className={styles.glowingText}>
      {text.split("").map((letter, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.3}s` }}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default GlowingText;
