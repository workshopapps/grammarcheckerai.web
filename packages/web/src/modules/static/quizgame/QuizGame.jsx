/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../quizgame/QuizGame.module.scss';
import { BsArrowLeft } from 'react-icons/bs';

const QuizGame = () => {
  const [trivia, setTrivia] = useState({});

  const getQuestions = async () => {
    try {
      const response = await axios.get('https://grittygrammar.hng.tech/api/v1/quiz');
      console.log(response.data[0]);
      const data = response.data;
      setTrivia(data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <section className={styles.quizgame}>
      <div className={styles.quizgame__card}>
        <div className={styles.quizgame_card__back}>
          <Link to="/"><BsArrowLeft /></Link>
        </div>

        <div className={styles.quizgame_card__content}>
          <h1 className={styles.quizgame_card__content__heading}>Test your skills in {trivia.category}</h1>

          <h3 className={styles.quizgame_card__content__question}>{trivia.question}</h3>

          <ul className={styles.quizgame_card__content__answers}>
            {/* <li>{trivia.incorrectAnswers[0]}</li>
            <li>{trivia.incorrectAnswers[1]}</li>
            <li>{trivia.incorrectAnswers[2]}</li>
            <li>{trivia.incorrectAnswers[3]}</li> */}
            {
              Object.keys(trivia.incorrectAnswers).map((element) => {
                return <li key={element}>{element}</li>
              })
            }
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuizGame;
