/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';
import { BsArrowLeft } from 'react-icons/bs';

const QuizGame = () => {
  const [trivia, setTrivia] = useState({});
  const [answer, setAnswer] = useState(false);

  const handleAnswer = (e) => {
    console.log(trivia.correctAnswer);
    let option = e.target.innerText;
    console.log(e.target.innerText);
    let tick = trivia.correctAnswer;

    if (tick === option) {
      console.log('hey');
      setAnswer(true);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get('https://grittygrammar.hng.tech/api/v1/quiz');
      console.log(response.data);
      const data = response.data;
      setTrivia(data);
      console.log(data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  let names = trivia.incorrectAnswers;
  console.log(trivia.question);

  return (
    <section className={styles.quizgame}>
      <div className={styles.quizgame_card}>

        <div className={styles.quizgame_card__content}>
          <h1 className={styles.quizgame_card__content__heading}>Test your skills in {trivia.category}</h1>

          <h3 className={styles.quizgame_card__content__question}>{trivia.question}</h3>

          {answer ? (
            <div className={styles.quiz_card__check}>
              <Link to="/quizgame">
                Great job! <BsArrowLeft />
              </Link>
            </div>
          ) : (
            <ul className={styles.quiz_card__content__answers}>
              {names.map(function (element, index){
                return <li onClick={handleAnswer} key={ index }>{element}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizGame;
