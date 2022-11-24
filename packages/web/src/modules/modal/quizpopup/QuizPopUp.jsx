/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styles from '../quizpopup/QuizPopUp.module.scss';
import { GrClose } from 'react-icons/gr';

// eslint-disable-next-line react/prop-types
const QuizPopUp = ({ showQuiz, setShowQuiz }) => {
  const [answer, setAnswer] = useState(false);

  const handleAnswer = () => {
    setAnswer(true);
  };

  return (
    <>
      {showQuiz ? (
        <div className={styles.quiz}>
          <div className={styles.quiz_card}>

            <div onClick={() => setShowQuiz(false)} className={styles.quiz_card__close}>
                <GrClose />
            </div>

            <div className={styles.quiz_card__content}>
              <h2 className={styles.quiz_card__content__heading}>Take a Fun Quiz!</h2>

              <h3 className={styles.quiz_card__content__question}>
                Which American rock band released the studio album <q>Music from Another Dimension!?</q>
              </h3>

              <ul className={styles.quiz_card__content__answers}>
                <li onClick={handleAnswer}>MercyMe</li>
                <li onClick={handleAnswer}>The Pussycat Dolls</li>
                <li onClick={handleAnswer}>Three 6 Mafia</li>
                <li onClick={handleAnswer}>Aerosmith</li>
              </ul>
            </div>

          </div>

        </div>
      ) : ''}
      {answer}
    </>
  );
};

export default QuizPopUp;
