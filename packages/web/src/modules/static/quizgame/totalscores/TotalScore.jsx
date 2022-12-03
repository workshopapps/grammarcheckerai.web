/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import styles from '../totalscores/TotalScore.module.scss';

const TotalScores = ({winnerMsg, setStart, setWinner}) => {

  useEffect(() => {
    setInterval(() => {
      setWinner(false);
    }, 5000)
  })
  
  return (
    <section className={styles.total_score}>

      <div className={styles.total_score__card}>

        <div className={styles.total_score__card__text}>
          <h1>✨{winnerMsg}✨</h1> 
        </div>

        <div className={styles.total_score__card__btn}>
          <button onClick={() => setWinner(false)}>Continue</button>
          <button onClick={() => setStart(false)}>Quit Round</button>
        </div>

      </div>
      
    </section>
  )
}

export default TotalScores;
