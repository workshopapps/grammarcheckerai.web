/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useContext } from 'react';
// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../QuizContext';
// import { io } from 'socket.io-client';
import QuizGame from '../QuizGame';
import Rank from '../rank/Rank';
import styles from '../startgame/StartGame.module.scss';

const StartGame = () => {
  const {socket} = useContext(QuizContext);
  const [players, setPlayers] = useState(0);
  const [ start, setStart ] = useState(false);
  const [ rank, setRank ] = useState(false);

  // console.log(socket);
  const handleStart = () => {
    socket.connect();
    socket.on('update-players', (count) => {
      setPlayers(count);
    });
    const userId = localStorage.getItem('grittyuserid');
    socket.emit('start-quiz', userId);
    console.log(userId);
    setStart(true);
  };


  return (
    <>
      {start ? <QuizGame players={players} setPlayers={setPlayers} /> : (
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
