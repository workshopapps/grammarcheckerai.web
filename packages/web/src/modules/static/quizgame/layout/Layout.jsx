import React from 'react';
import QuizContextProvider from '../QuizContext';
import StartGame from '../startgame/StartGame';

const Layout = () => {
  return (
    <QuizContextProvider>
      <StartGame/>
    </QuizContextProvider>
  )
}

export default Layout;
