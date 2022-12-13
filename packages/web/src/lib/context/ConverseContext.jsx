/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';

const ConverseContext = createContext();

const ConverseContextProvider = (props) => {
  const socket = io('https://api.speakbetter.hng.tech', { autoConnect: true });

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log(`You connected with ${socket.id} from converse context`);
    });
  }, []);

  return <ConverseContext.Provider value={{ socket }}>{props.children}</ConverseContext.Provider>;
};

export const useConverseContext = () => React.useContext(ConverseContext);

export default ConverseContextProvider;
