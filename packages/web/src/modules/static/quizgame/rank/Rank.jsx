/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../rank/Rank.module.scss';
import { GrClose } from 'react-icons/gr';

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
          <GrClose />
        </div>
        <div className={styles.rank_card__content}>
          <h2>✨ Top Players ✨</h2>
          <table>
            <thead>
              <tr>
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
                    <td>{element.rank}</td>
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
