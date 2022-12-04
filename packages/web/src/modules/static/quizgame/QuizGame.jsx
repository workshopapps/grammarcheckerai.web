/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, useContext } from 'react';
import { QuizContext } from './QuizContext';
import { Link } from 'react-router-dom';
import styles from '../quizgame/QuizGame.module.scss';
import TotalScores from './totalscores/TotalScore';
import loading from '../../../assets/newsletterImages/loading.gif';

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const QuizGame = ({ players, setPlayers, setStart }) => {
  const { socket, isLoading, setIsLoading } = useContext(QuizContext);
  const timeRef = useRef(null);
  const [winnerMsg, setWinnerMsg] = useState('');
  const [answerList, setAnswerList] = useState([]);
  const [seconds, setSeconds] = useState(30);
  const [triviaQuestion, setTriviaQuestion] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [winner, setWinner] = useState(false);
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
    setStart(false);
  };

  let tick = triviaQuestion.answer;

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === tick;
    const userId = localStorage.getItem('grittyuserid');
    socket.emit('update-quizProfile', userId, isCorrect);
    if (isCorrect) {
      socket.emit('get-roundWinner', userId);
      setTimeOut(false);
      setWinner(true);
      setScore(score + 1);
    }
    socket.on('receive-roundWinner', (roundWinnerMessage) => {
      setWinnerMsg(roundWinnerMessage);
    });
    setTimeout(() => {
      if (isCorrect) {
        setChangeColor('green');
        setQuestionAnswer(questionAnswer + 1);
      } else {
        setChangeColor('red');
      }
    }, 1000);
  };

  const handleAnswer = (element) => {
    setSelectedAnswer(element);
    setChangeColor('yellow');
  };

  const countPlayers = () => {
    if (players > 1) {
      return `You and ${players - 1} others are currently playing`;
    } else if (players <= 1) {
      return 'You are the only one here';
    }
  };

  const getQuestion = async () => {
    setIsLoading(true);
    try {
      socket.emit('get-question');
      socket.on('receive-question', (question) => {
        setTriviaQuestion(question);
        let correctAnswer = question.answer;
        let incorrectAnswers = question.incorrectAnswers;
        const options = shuffle([...incorrectAnswers, correctAnswer]);
        setAnswerList(options);
        setIsLoading(false);
      });
    } catch (err) {
      console.log('Error', err);
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    setSeconds(30);
    setQuestionNumber(questionNumber + 1);
    getQuestion();
  }, [score]);

  let countdown;
  useEffect(() => {
    if (seconds === 0) {
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
              <div className={styles.quizgame__end}>
                <h1>You Lost </h1>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div>
                    <img src={loading} alt="Loading gif" />
                  </div>
                ) : (
                  <>
                    <div className={styles.quizgame_card}>
                      <div className={styles.quizgame_card__content}>
                        <h1 className={styles.quizgame_card__content__heading}>Test your skills with this Trivia</h1>
                        <>
                          <h3 className={styles.quizgame_card__content__question}>{triviaQuestion.question}</h3>
                          <ul id="mainList" className={styles.quizgame_card__content__answers}>
                            {answerList &&
                              answerList.map(function (element, index) {
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
              </>
            )}

            <div className={styles.quizgame__btn}>
              <button onClick={handleExit}>End Quiz</button>
              {timeOut ? '' : <button onClick={handleSubmit}>Submit</button>}
            </div>
          </>
        )}

        {winner ? <TotalScores winnerMsg={winnerMsg} setStart={setStart} setWinner={setWinner} /> : ''}
      </section>
    </>
  );
};

export default QuizGame;
