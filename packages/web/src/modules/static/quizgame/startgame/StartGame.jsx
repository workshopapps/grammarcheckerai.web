/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import QuizGame from '../QuizGame';
import Rank from '../rank/Rank';
import styles from '../startgame/StartGame.module.scss';

const StartGame = () => {
  const [ start, setStart ] = useState(false);
  const [ rank, setRank ] = useState(false);

  const handleStart = () => {
    setStart(true);
    const socket = io('http://api.speakbetter.hng.tech/');
    socket.on('connect', () => {
      console.log(`You connected with ${socket.id}`);
    });
    // socket.emit('start-quiz', 'id');
  };
  

  return (
    <>
      {start ? <QuizGame/> : (
        <section className={styles.startgame}>
          <div className={styles.startgame_card}>
            <h1>Join Quiz</h1>
    
            <p>Test your skills among other players in this amazing Quiz Adventure.</p>
    
            <div className={styles.startgame_card__btn}>
              <button onClick={handleStart}>Start Game</button>
              <button onClick={() => setRank(true)}>Leader Board</button>
            </div>

            <div className={styles.startgame_card__exit}>
              <Link to="/">Exit Game</Link>
            </div>
          </div>
        </section>
      )}

      {rank ? <Rank setRank={setRank} /> : null}
    </>
  );
};

export default StartGame;
