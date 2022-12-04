/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';
import { io } from 'socket.io-client';

export const QuizContext = createContext();

const QuizContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const socket = io('https://api.speakbetter.hng.tech/', {autoConnect: false});

  socket.on('connect', () => {
    console.log(`You connected with ${socket.id}`);
  });

  return (
    <QuizContext.Provider value={{socket, isLoading, setIsLoading}}>
      {props.children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider;
