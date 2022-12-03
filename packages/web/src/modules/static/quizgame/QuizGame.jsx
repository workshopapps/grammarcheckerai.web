/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, useContext } from 'react';
import logo from '../../../assets/newsletterImages/logo.png';
import { QuizContext } from './QuizContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';
import TotalScores from '../quizgame/totalscores/TotalScore';

const QuizGame = ({ players, setPlayers }) => {
  const { socket } = useContext(QuizContext);

  const timeRef = useRef(null);
  const optionRef = useRef(null);

  const [seconds, setSeconds] = useState(30);
  const [triviaQuestion, setTriviaQuestion] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [className, setClassName] = useState('answer');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  // const [timeOut, setTimeOut] = useState(false);
  const [changeColor, setChangeColor] = useState('#e8ddf2');

  const handleExit = () => {
    socket.disconnect();
    socket.on('update-players', (count) => {
      setPlayers(count);
    });
  };

  const handleAnswer = (element) => {
    // let option = e.target.innerText;
    let tick = triviaQuestion.answer;
    if (tick === element) {
      optionRef.current.style.backgroundColor = 'red';
      setScore(score + 5);
    } else {
      setScore(score - 1);
    }
    setSelectedAnswer(element);
    console.log(element);
    console.log(tick);
    setClassName('answer active');
    setTimeout(() => {
      if(element === tick){
        setClassName(element===tick ? 'answer1' : 'mainOptions');
        console.log('correct');
        // setChangeColor(element === tick ? 'green' : 'red')
        // setChangeColor('green');
      } 
      else {
        console.log('incorrect');
      }
    }, 1000)
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
    api();
  }, []);

  let countdown;
  useEffect(() => {
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
  }, []);

  return (
    <>
      <section id="game" className={styles.quizgame}>
        <div className={styles.quizgame__img}>
          {/* <Link to="/">
            <img src={logo} alt="" />
          </Link> */}
          <div ref={timeRef} className={styles.quizgame__img__timer}>
            <h2>{seconds}</h2>
          </div>
          <p>{countPlayers()}</p>
        </div>
        {errorMsg ? (
          <div className={styles.quizgame__err}>
            <h3>Oops! Looks like an error occurred</h3>
            <p>Bare with us while we get the server back up...</p>
            <Link to="/">Exit page</Link>
          </div>
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
                            style={{backgroundColor:changeColor}}
                            className={selectedAnswer === element ? className : 'mainOptions'}
                            id='mainOptions'
                            ref={optionRef}
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
            {answer ? (
              <TotalScores />
            ) : (
              <div className={styles.quizgame__btn}>
                <button onClick={handleExit}>End Quiz</button>
                <button onClick={() => setAnswer(true)}>Submit</button>
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
// Compare answers
// socket.emit("update-quizProfile", userId, isCorrect)
// if(isCorrect){
//  socket.emit("get-roundWinner", userId)
// }
// socket.on("receive-roundWinner", (fn) => {
//  fn(userId);
//})
