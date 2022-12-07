import React from 'react';
import useTheme from '../../../hooks/useTheme';
import styles from './index.module.css';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Converse from './converse';

function Conversation() {
  const context = useTheme();

  return (
    <>
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`space-y-6 flex flex-col ${styles._convo} ${context.theme === 'dark' ? styles.convo_theme : null} ${
          styles._height
        }`}
      >
        <Converse />
        <Toaster />
      </motion.div>
    </>
  );
}

export default Conversation;
