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

  const getQuestions = async () => {
    try {
      const response = await axios.get('https://speakbetter.hng.tech/api/v1/quiz');
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

  const handleAnswer = (e) => {
    let option = e.target.innerText;
    // console.log(e.target.innerText);
    let tick = trivia.correctAnswer;
    if (tick === option) {
      setAnswer(true);
    }
  };

  const removePopUp = () => {
    console.log('bye');
    setAnswer(false);
    setShowQuiz(false);
  };

  const handleClose = () => {
    setShowQuiz(false);
    // if (showQuiz == true) {
    //   setInterval(() => {
    //     setShowQuiz(true);
    //   }, 50000);
    // }
  };

  return (
    <>
      {errorMsg ? (
        setShowQuiz(false)
      ) : (
        <>
          {showQuiz ? (
            <Link to="/startgame">
            <div className={styles.quiz}>
              <div className={styles.quiz_card}>
                <div onClick={handleClose} className={styles.quiz_card__close}>
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
                          <Link to="/quizgame">Continue?</Link>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className={styles.quiz_card__content__question}>{trivia.question}</h3>
                      <ul className={styles.quiz_card__content__answers}>
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
                        {trivia.incorrectAnswers &&
                          trivia.incorrectAnswers.map((element) => {
                            return (
                              <li onClick={handleAnswer} key={element}>
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
              </Link>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default QuizPopUp;
