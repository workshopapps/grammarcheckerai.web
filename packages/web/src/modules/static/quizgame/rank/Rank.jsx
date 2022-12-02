/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from '../rank/Rank.module.scss';
import { GrClose } from 'react-icons/gr';

const Rank = ({ setRank }) => {

  return (
    <section className={styles.rank}>
      <div className={styles.rank_card}>
        <div className={styles.rank_card__img} onClick={() => setRank(false)}>
          <GrClose />
        </div>

        <div className={styles.rank_card__content}>
          <h2>Top Players</h2>
          <ol>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Rank;
