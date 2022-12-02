/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from 'react';
import logo from '../../../assets/newsletterImages/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';
import TotalScores from '../quizgame/totalscores/TotalScore';

const QuizGame = () => {
  const timeRef = useRef(null);
  const [seconds, setSeconds] = useState(30);
  const [triviaQuestion, setTriviaQuestion] = useState([]);
  // const [correctAnswer, setCorrectAnswer] = useState("");
  // const [trivia, setTrivia] = useState({});
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleAnswer = (e) => {
    let option = e.target.innerText;
    let tick = triviaQuestion.correct_answer;
    if (tick === option) {
      setScore(score + 5);
    } else {
      setScore(score - 1);
    }
  };

  const getQuestions = async () => {
    try {
      // const response = await axios.get('https://speakbetter.hng.tech/api/v1/quiz');
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      console.log(response.data);
      const data = response.data;
      // setTrivia(data);
      setTriviaQuestion(data.results[0]);
      let correctAnswer = data.results[0].correct_answer;
      let incorrectAnswers = data.results[0].incorrect_answers;
      let optionList = incorrectAnswers.splice(
        Math.floor(Math.random() * (incorrectAnswers.length + 1)),
        0,
        correctAnswer,
      );
      console.log(optionList);
      console.log(correctAnswer);
    } catch (error) {
      console.log('Error', error);
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [score]);

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
  });

  return (
    <>
      <section id="game" className={styles.quizgame}>
        <div className={styles.quizgame__img}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div ref={timeRef} className={styles.quizgame__img__timer}>
            <h2>{seconds}</h2>
          </div>
        </div>

        {/* {errorMsg ? (
      <div className={styles.quizgame__err}>
        <h3>Oops! Looks like an error occurred</h3>
        <p>Bare with us while we get the server back up...</p>
        <Link to="/">Exit page</Link>
      </div>
    ) : (
      <>
        <div className={styles.quizgame_card}>
          <div className={styles.quizgame_card__content}>
            <h1 className={styles.quizgame_card__content__heading}>
              Test your skills in {trivia.category} with this Trivia
            </h1>
            <>
              <h3 className={styles.quizgame_card__content__question}>{trivia.question}</h3>
              <ul id="mainList" className={styles.quizgame_card__content__answers}>
                {trivia.incorrectAnswers &&
                  trivia.incorrectAnswers.map(function (element, index) {
                    return (
                      <li id="mainOptions" onClick={handleAnswer} key={index}>
                        {element}
                      </li>
                    );
                  })}
              </ul>
            </>
          </div>
        </div>

        {answer ? (
          <div className={styles.quizgame_card__score}>
            <p>Your Score is {score}</p>
            <button>
              <Link to="/">Exit</Link>
            </button>
          </div>
        ) : (
          <div className={styles.quizgame__btn}>
            <button onClick={() => setAnswer(true)}>View Score</button>
          </div>
        )}
      </>
    )} */}

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
                <h1 className={styles.quizgame_card__content__heading}>
                  Test your skills in {triviaQuestion.category} with this Trivia
                </h1>
                <>
                  <h3 className={styles.quizgame_card__content__question}>{triviaQuestion.question}</h3>
                  <ul id="mainList" className={styles.quizgame_card__content__answers}>
                    {triviaQuestion.incorrect_answers &&
                      triviaQuestion.incorrect_answers.map(function (element, index) {
                        return (
                          <li id="mainOptions" onClick={handleAnswer} key={index}>
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
