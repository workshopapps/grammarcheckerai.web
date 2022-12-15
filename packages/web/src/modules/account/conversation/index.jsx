import React from 'react';
import styles from './index.module.css';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Converse from './converse';

function Conversation() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`space-y-6 flex flex-col ${styles._convo}  ${styles._height}`}
      >
        <Converse />
        <Toaster />
      </motion.div>
    </>
  );
}

export default Conversation;
