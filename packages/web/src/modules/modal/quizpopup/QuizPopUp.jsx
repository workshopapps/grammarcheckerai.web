/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../quizpopup/QuizPopUp.module.scss';
import { GrClose } from 'react-icons/gr';
import { BsArrowRight } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
const QuizPopUp = ({ showQuiz, setShowQuiz }) => {
  // eslint-disable-next-line no-unused-vars
  const [answer, setAnswer] = useState(false);
  const [trivia, setTrivia] = useState({});

  const getQuestions = async () => {
    try {
      const response = await axios.get(
        'https://grittygrammar.hng.tech/api/v1/quiz',
      );
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

  const handleAnswer = (e) => {
    // console.log(e.target.value);
    console.log(trivia.correctAnswer);
    let option = e.target.innerText;
    console.log(e);
    console.log(e.target.innerText);
    let tick = trivia.correctAnswer;
    
    if(tick === option) {
      console.log('hey');
      setAnswer(true);
    }
  };

  const handleClose = () => {
    setShowQuiz(false);
    if(showQuiz !== true ) {
      setInterval(() => {
        setShowQuiz(true);
      }, 50000);
    }
  }

  return (
    <>
      {showQuiz ? (
        <div className={styles.quiz}>
          <div className={styles.quiz_card}>
            <div onClick={handleClose} className={styles.quiz_card__close}>
              {/* <Link to='/quizgame'><BsArrowRight /></Link> */}
              <GrClose />
            </div>

            <div className={styles.quiz_card__content}>
              <h2 className={styles.quiz_card__content__heading}>Take a Fun Quiz!</h2>

              <h3 className={styles.quiz_card__content__question}>
                {trivia.question}
              </h3>

              {
                answer ? 
                <div className={styles.quiz_card__check}>
                  <Link to='/'>
                    Great job! 
                    <BsArrowRight />
                  </Link>
                </div>
                 :
              
              <ul className={styles.quiz_card__content__answers}>
                <li value={trivia.incorrectAnswers[0]} onClick={handleAnswer}>{trivia.incorrectAnswers[0]}</li>
                <li value={trivia.incorrectAnswers[1]} onClick={handleAnswer}>{trivia.incorrectAnswers[1]}</li>
                <li value={trivia.incorrectAnswers[2]} onClick={handleAnswer}>{trivia.incorrectAnswers[2]}</li>
                <li value={trivia.incorrectAnswers[3]} onClick={handleAnswer}>{trivia.incorrectAnswers[3]}</li>
              </ul>
              }
            </div>
          </div>
        </div>
        
      ) : ''}
    </>
  );
};

export default QuizPopUp;
