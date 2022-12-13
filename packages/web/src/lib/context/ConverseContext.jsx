/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import { ENDPOINTS } from '../constants';

const ConverseContext = createContext();

const ConverseContextProvider = (props) => {
  const socket = io('https://04c2-197-211-32-243.ngrok.io', { autoConnect: false });

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log(`You connected with ${socket.id} from converse context`);
    });
  }, []);

  return <ConverseContext.Provider value={{ socket }}>{props.children}</ConverseContext.Provider>;
};

export const useConverseContext = () => React.useContext(ConverseContext);

export default ConverseContextProvider;
