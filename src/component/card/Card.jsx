
import React from "react";
import styles from "./Card.module.css";

const Card = ({ cardData, title, labels }) => {
  if(!cardData)return null;
  return (
    <div className={`${styles.card} ${styles.container}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.column}>
            {labels.map((label) => (
              <div key={label} className={styles.label}>
                {label}
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {Object.entries(cardData).map(([label, value]) => (
              <div key={label} className={styles.value}>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
