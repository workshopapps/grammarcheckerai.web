/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, useContext } from 'react';
// import logo from '../../../assets/newsletterImages/logo.png';
import { QuizContext } from './QuizContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';
import TotalScores from '../quizgame/totalscores/TotalScore';

const QuizGame = ({ players, setPlayers }) => {
  const { socket } = useContext(QuizContext);

  const timeRef = useRef(null);

  const [seconds, setSeconds] = useState(30);
  const [triviaQuestion, setTriviaQuestion] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [changeColor, setChangeColor] = useState('#e8ddf2');

  const handleExit = () => {
    socket.disconnect();
    socket.on('update-players', (count) => {
      setPlayers(count);
    });
  };

  const handleAnswer = (element) => {
    let tick = triviaQuestion.answer;
    setSelectedAnswer(element);
    setChangeColor('yellow');
    setTimeout(() => {
      if (element === tick) {
        console.log('correct');
        setChangeColor('green');
        setScore(score + 1);
      } else {
        // setChangeColor(element !== tick ? 'red' : 'yellow');
        setChangeColor('red');
        console.log('incorrect');
        setScore(score - 1);
      }
    }, 1000);
  };

  const countPlayers = () => {
    if (players > 1) {
      return `You and ${players - 1} others are currently playing`;
    } else if (players <= 1) {
      return 'You are the only one here';
    }
  };

  const getQuestion = async () => {
    const quiz = await axios.get('https://the-trivia-api.com/api/questions?limit=1');
    const data = quiz.data[0];
    const question = {
      id: data.id,
      answer: data.correctAnswer,
      incorrectAnswers: data.incorrectAnswers,
      question: data.question,
    };
    return question;
  };

  useEffect(() => {
    const api = async () => {
      const question = await getQuestion();
      console.log(question);
      setTriviaQuestion(question);
      let correctAnswer = question.answer;
      let incorrectAnswers = question.incorrectAnswers;
      incorrectAnswers.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
    };

    setSeconds(30);
    // setTimeOut(true);
    api();
  }, [score]);

  let countdown;
  useEffect(() => {
    if (seconds === 0) {
      console.log('end');
      return setTimeOut(true);
    }
    countdown = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setSeconds(30);
      }
      if (seconds <= 10) {
        timeRef.current.style.backgroundColor = 'red';
      } else {
        timeRef.current.style.backgroundColor = 'grey';
      }
    }, 3000);

    return () => clearInterval(countdown);
  }, [seconds, setTimeOut]);

  return (
    <>
      <section id="game" className={styles.quizgame}>
        <div className={styles.quizgame__img}>
          {timeOut ? (
            ''
          ) : (
            <>
              <div ref={timeRef} className={styles.quizgame__img__timer}>
                <h2>{seconds}</h2>
              </div>
              <p>{countPlayers()}</p>
            </>
          )}
        </div>
        {errorMsg ? (
          <div className={styles.quizgame__err}>
            <h3>Oops! Looks like an error occurred</h3>
            <p>Bare with us while we get the server back up...</p>
            <Link to="/">Exit page</Link>
          </div>
        ) : (
          <>
            {timeOut ? (
              <div className={styles.quizgame__end}><h1>You Lost </h1></div>
            ) : (
              <>
                <div className={styles.quizgame_card}>
                  <div className={styles.quizgame_card__content}>
                    <h1 className={styles.quizgame_card__content__heading}>Test your skills with this Trivia</h1>
                    <>
                      <h3 className={styles.quizgame_card__content__question}>{triviaQuestion.question}</h3>
                      <ul id="mainList" className={styles.quizgame_card__content__answers}>
                        {triviaQuestion.incorrectAnswers &&
                          triviaQuestion.incorrectAnswers.map(function (element, index) {
                            return (
                              <li
                                style={{ backgroundColor: selectedAnswer === element ? changeColor : '#e8ddf2' }}
                                id="mainOptions"
                                onClick={() => handleAnswer(element)}
                                key={index}
                              >
                                {element}
                              </li>
                            );
                          })}
                      </ul>
                    </>
                  </div>
                </div>
              </>
            )}

            {answer ? (
              <TotalScores />
            ) : (
              <div className={styles.quizgame__btn}>
                <button onClick={handleExit}>
                  <Link to="/startgame">End Quiz</Link>{' '}
                </button>
                {timeOut ? '' : <button onClick={() => setAnswer(true)}>Submit</button>}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default QuizGame;

// Set up a submit handler
// Compare answers DONE
// socket.emit("update-quizProfile", userId, isCorrect)
// if(isCorrect){
//  socket.emit("get-roundWinner", userId)
// }
// socket.on("receive-roundWinner", (fn) => {
//  fn(userId);
//})
