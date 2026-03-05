import React from "react";
import clsx from "clsx";
import * as styles from "./SummaryCards.module.scss";
import { SummaryCard } from "../../data";

interface Props {
  cards: SummaryCard[];
}

const SummaryCards: React.FC<Props> = ({ cards }) => (
  <div className={styles.grid}>
    {cards.map((card) => (
      <div
        key={card.label}
        className={clsx(styles.card, {
          [styles[`card--${card.rating}`]]: card.rating,
        })}
      >
        <span className={styles.label}>{card.label}</span>
        <span className={styles.value}>{card.value}</span>
        {card.trend !== undefined && (
          <span
            className={clsx(styles.trend, {
              [styles["trend--up"]]: card.trend > 0,
              [styles["trend--down"]]: card.trend < 0,
            })}
          >
            {card.trend > 0 ? "↑" : "↓"} {Math.abs(card.trend)}% vs last period
          </span>
        )}
      </div>
    ))}
  </div>
);

export default SummaryCards;
