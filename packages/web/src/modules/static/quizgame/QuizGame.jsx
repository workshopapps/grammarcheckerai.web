/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/newsletterImages/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';

const QuizGame = () => {
  const [trivia, setTrivia] = useState({});
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleAnswer = (e) => {
    // console.log(trivia.correctAnswer);
    let option = e.target.innerText;
    // console.log(e.target.innerText);
    let tick = trivia.correctAnswer;
    if (tick === option) {
      setScore(score + 5);
    } else {
      setScore(score - 1);
    }
  };

  const getQuestions = async () => { 
    try {
      const response = await axios.get('https://speakbetter.hng.tech/api/v1/quiz');
      console.log(response.data);
      const data = response.data;
      setTrivia(data);
    } catch (error) {
      console.log('Error', error);
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [score]);

  return (
    <section id="game" className={styles.quizgame}>
      <div className={styles.quizgame__img}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
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
      )}
    </section>
  );
};

export default QuizGame;
