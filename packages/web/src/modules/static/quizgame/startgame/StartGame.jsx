/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../../../assets/newsletterImages/logo1.png';
import close from '../../../../assets/newsletterImages/close-square.png';
import { QuizContext } from '../QuizContext';
import QuizGame from '../QuizGame';
import Rank from '../rank/Rank';
// import background from '../../../../assets/newsletterImages/background2.png';
import styles from '../startgame/StartGame.module.scss';

const StartGame = () => {
  const { socket } = useContext(QuizContext);
  const [players, setPlayers] = useState(0);
  const [start, setStart] = useState(false);
  const [rank, setRank] = useState(false);
  const [color, setColor] = useState('#CACACA');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleStart = () => {
    const userId = localStorage.getItem('grittyuserid');
    // if (userId
    //   && (userId !== null || userId !== '')
    //   ) {
    socket.connect();
    socket.on('update-players', (count) => {
      setPlayers(count);
    });
    socket.emit('start-quiz', userId);
    setStart(true);
    setColor('white');
    // } else if (userId === null || userId === '') {
    //   console.log('Only logged in users can play quiz');
    //   setLoggedIn(true);
    //   socket.disconnect();
    // }
  };

  return (
    <>
      <div className={styles.nav}>
        <img src={logo1} alt="speak better logo" />
      </div>

      <div
        style={{backgroundColor: color}}
        className={styles.main}
      >
        {loggedIn ? (
          <div className={styles.logged}>
            <>
              <h1 className={styles.logged_text}>Only Logged In Users Can Play</h1>
              <div className={styles.startgame_card__exit}>
                <Link to="/">Exit Game</Link>
              </div>
            </>
          </div>
        ) : (
          <>
            {start ? (
              <QuizGame players={players} setPlayers={setPlayers} setStart={setStart} />
            ) : (
                <section className={styles.startgame}>
                  <div className={styles.startgame_card}>
                    <div className={styles.startgame_card__img}>
                      <Link to="/">
                        <img src={close} alt="" />
                      </Link>
                    </div>

                    <h1>Join Quiz</h1>

                    <p>Test your skills among other players in this amazing Quiz Adventure.</p>

                    <div className={styles.startgame_card__btn}>
                      <button onClick={handleStart}>Start Quiz</button>
                      <button onClick={() => setRank(true)}>LeaderBoard</button>
                    </div>

                    <div className={styles.startgame_card__exit}>
                      <Link to="/">Exit Quiz</Link>
                    </div>
                  </div>
                </section>
            )}

            {rank ? <Rank setRank={setRank} /> : null}
          </>
        )}
      </div>
    </>
  );
};

export default StartGame;
