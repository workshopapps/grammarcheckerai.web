/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const QuizContext = createContext();

const QuizContextProvider = (props) => {
  // const userId = localStorage.getItem('grittyuserid');
  const socket = io('https://api.speakbetter.hng.tech/', { autoConnect: false });

  // if (userId 
  //   // && 
  //   // (userId !== null || userId !== '')
  //   ) {
    socket.on('connect', () => {
      console.log(`You connected with ${socket.id}`);
    });
  // }
  //  else {
  //   console.log('You must be a logged in user');
  // }

  return <QuizContext.Provider value={{ socket }}>{props.children}</QuizContext.Provider>;
};

export default QuizContextProvider;
