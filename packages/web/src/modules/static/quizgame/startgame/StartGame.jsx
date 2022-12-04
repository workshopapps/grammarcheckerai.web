/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../QuizContext';
import QuizGame from '../QuizGame';
import Rank from '../rank/Rank';
import styles from '../startgame/StartGame.module.scss';

const StartGame = () => {
  const { socket } = useContext(QuizContext);
  const [players, setPlayers] = useState(0);
  const [start, setStart] = useState(false);
  const [rank, setRank] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleStart = () => {
    const userId = localStorage.getItem('grittyuserid');
    if (userId !== null) {
      socket.connect();
      socket.on('update-players', (count) => {
        setPlayers(count);
      });
      socket.emit('start-quiz', userId);
      setStart(true);
    } else if (userId === null) {
      console.log('Only logged in users can play quiz');
      setLoggedIn(true);
      socket.disconnect();
    }
  };

  return (
    <>
      {loggedIn ? (
        <div className={styles.logged}>
          <h1 className={styles.logged_text}>Only Logged In Users Can Play</h1>
          <div className={styles.startgame_card__exit}>
            <Link to="/">Exit Game</Link>
          </div>
        </div>
      ) : (
        <>
          {start ? (
            <QuizGame players={players} setPlayers={setPlayers} setStart={setStart} />
          ) : (
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
      )}
    </>
  );
};

export default StartGame;
