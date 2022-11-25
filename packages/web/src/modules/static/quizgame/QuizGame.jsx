/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';

const QuizGame = () => {
  const [trivia, setTrivia] = useState({});
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (e) => {
    console.log(trivia.correctAnswer);
    let option = e.target.innerText;
    console.log(e.target.innerText);
    let tick = trivia.correctAnswer;
    if (tick === option) {
      setScore(score + 10);
    } else {
      setScore(score - 1);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get('https://grittygrammar.hng.tech/api/v1/quiz');
      console.log(response.data);
      const data = response.data;
      setTrivia(data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // let names = trivia.incorrectAnswers;
  // console.log(names);

  return (
    <section className={styles.quizgame}>
      <div className={styles.quizgame_card}>
        <div className={styles.quizgame_card__content}>
          <h1 className={styles.quizgame_card__content__heading}>Test your skills in {trivia.category}</h1>
          <>
            <h3 className={styles.quizgame_card__content__question}>{trivia.question}</h3>
            <ul id='mainList' className={styles.quizgame_card__content__answers}>
              {trivia.incorrectAnswers && trivia.incorrectAnswers.map(function (element, index) {
                return (
                  <li id='mainOptions' onClick={handleAnswer} key={index}>
                    {element}
                  </li>
                );
              })}
              {/* <li value={trivia.incorrectAnswers[0]} onClick={handleAnswer}>
                {trivia.incorrectAnswers[0]}
              </li>
              <li value={trivia.incorrectAnswers[1]} onClick={handleAnswer}>
                {trivia.incorrectAnswers[1]}
              </li>
              <li value={trivia.incorrectAnswers[2]} onClick={handleAnswer}>
                {trivia.incorrectAnswers[2]}
              </li>
              <li value={trivia.incorrectAnswers[3]} onClick={handleAnswer}>
                {trivia.incorrectAnswers[3]}
              </li> */}
            </ul>
          </>
        </div>
      </div>

      {answer ? <div className={styles.quizgame_card__score}>Your Score is {score}</div>
        : <div className={styles.quizgame__btn}><button onClick={()=> setAnswer(true)}>View Score</button></div>}
    </section>
  );
};

export default QuizGame;
