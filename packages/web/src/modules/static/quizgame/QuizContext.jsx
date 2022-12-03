/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const QuizContext = createContext();

const QuizContextProvider = (props) => {

    const socket = io('http://127.0.0.1:5001/', {autoConnect: false});

    socket.on('connect', () => {
      console.log(`You connected with ${socket.id}`);
    });

  return (
    <QuizContext.Provider value={{socket}}>
      {props.children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider;
