import styles from "./SectionTitle.module.scss";
import React from "react";

interface Props {
  basicTitle?: string;
  highlightTitle: string;
}
const SectionTitle: React.FC<Props> = ({ basicTitle, highlightTitle }) => {
  return (
    <h2 className={styles.sectionTitle}>
      <span className={styles.codeComment}>{basicTitle}</span>{" "}
      <span className={styles.highlight}>{highlightTitle}</span>
    </h2>
  );
};

export default SectionTitle;
