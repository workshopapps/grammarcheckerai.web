/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../quizpopup/QuizPopUp.module.scss';
import { GrClose } from 'react-icons/gr';

// eslint-disable-next-line react/prop-types
const QuizPopUp = ({ showQuiz, setShowQuiz }) => {
  // eslint-disable-next-line no-unused-vars
  const [answer, setAnswer] = useState(false);
  const [trivia, setTrivia] = useState({});
  const [errorMsg, setErrorMsg] = useState(false);
  const [changeColor, setChangeColor] = useState('#e8ddf2');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const getQuestions = async () => {
    try {
      const response = await axios.get('https://api.speakbetter.hng.tech/v1/quiz');
      console.log(response.data);
      const data = response.data;
      setTrivia(data);
    } catch (error) {
      setErrorMsg(true);
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleAnswer = (element) => {
    setSelectedAnswer(element);
    let tick = trivia.correctAnswer;
    if (tick === element) {
      setChangeColor('green');
      setTimeout(() => {
        setAnswer(true);
      }, 1000);
    } else {
      setChangeColor('red');
    }
  };

  const removePopUp = () => {
    setShowQuiz(false);
    setAnswer(false);
  };

  return (
    <>
      {errorMsg ? (
        setShowQuiz(false)
      ) : (
        <>
          {showQuiz ? (
            <div className={styles.quiz}>
              <div className={styles.quiz_card}>
                <div onClick={removePopUp} className={styles.quiz_card__close}>
                  <GrClose />
                </div>

                <div className={styles.quiz_card__content}>
                  <h2 className={styles.quiz_card__content__heading}>Take a Fun Quiz!</h2>

                  {answer ? (
                    <div className={styles.quiz_card__check}>
                      <p>✨ Great job! ✨</p>
                      <div className={styles.quiz_card__check__btn}>
                        <button className={styles.quiz_card__check__btn1} onClick={removePopUp}>
                          Cancel
                        </button>
                        <button className={styles.quiz_card__check__btn2}>
                          <Link to="/startgame">Continue?</Link>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className={styles.quiz_card__content__question}>{trivia.question}</h3>
                      <ul className={styles.quiz_card__content__answers}>
                        {trivia.incorrectAnswers &&
                          trivia.incorrectAnswers.map((element) => {
                            return (
                              <li 
                                style={{ backgroundColor: selectedAnswer === element ? changeColor : '#e8ddf2' }}
                                onClick={()=>handleAnswer(element)} 
                                key={element}
                              >
                                {element}
                              </li>
                            );
                          })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default QuizPopUp;
