/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../rank/Rank.module.scss';
import rank from '../../../../assets/newsletterImages/rank.png';
import close from '../../../../assets/newsletterImages/close-square.png';

const Rank = ({ setRank }) => {
  const [ranks, setRanks] = useState([]);

  const getLeaderBoard = async () => {
    const rankingBoard = await axios.get('https://api.speakbetter.hng.tech/v1/leaderboard');
    const data = rankingBoard.data;
    console.log(data.data);
    setRanks(data.data);
    console.log(ranks);
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <section className={styles.rank}>
      <div className={styles.rank_card}>
        <div className={styles.rank_card__img} onClick={() => setRank(false)}>
          <img src={close} alt="" />
        </div>
        <div className={styles.rank_card__content}>
          <div className={styles.rank_card__content__top}>
            <img src={rank} alt="" />
            <div className={styles.rank_card__content__top__text}>
              <h2>Leaderboard</h2>
              <p>See the top users on the lead.</p>
            </div>
          </div>

          <table>
            <thead>
              <tr style={{ color: '#8C54BF' }}>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Questions</th>
                <th>Total Points</th>
              </tr>
            </thead>
            {ranks.map((element) => {
              return (
                <tbody key={element}>
                  <tr>
                    <td style={{ color: '#8C54BF' }}>#{element.rank}</td>
                    <td>{element.username}</td>
                    <td>{element.totalQuestions}</td>
                    <td>{element.totalPoints}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </section>
  );
};

export default Rank;
