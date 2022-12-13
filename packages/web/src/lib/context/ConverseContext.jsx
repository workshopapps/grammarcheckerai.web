/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const ConverseContext = createContext();

const ConverseContextProvider = (props) => {
  const userId = localStorage.getItem('grittyuserid');
  const socket = io('https://api.speakbetter.hng.tech', { autoConnect: true });

  if (userId && (userId !== null || userId !== '')) {
    socket.on('connect', () => {
      console.log(`You connected with ${socket.id}`);
    });
  } else {
    console.log('You must be a logged in user');
  }

  return <ConverseContext.Provider value={{ socket }}>{props.children}</ConverseContext.Provider>;
};

export default ConverseContextProvider;
