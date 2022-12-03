/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../totalscores/TotalScore.module.scss';

const TotalScores = () => {

  return (
    <section className={styles.total_score}>

      <div className={styles.total_score__card}>

        <div>
          <h2>Score Board</h2> 
        </div>

        <div className={styles.total_score__card__btn}>
            <button>Continue</button>
            <button><Link to='/startgame'>Quit Round</Link></button>
        </div>

      </div>
      
    </section>
  )
}

export default TotalScores;
