import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../../../components/Chat';
import { getFontSize } from '../../../hooks/useCustomFont';

function ChatContainer({ chats }) {
  const [fontSize] = getFontSize();

  return (
    <div
      className="w-full max-w-7xl mx-auto flex flex-col justify-center px-4 space-y-3"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* <div className="flex items-center justify-end pr-14">
        <Audio />
      </div> */}
      {chats?.map((chat, index) => (
        <>
          <Chat createdAt={chat.createdAt} isLastReply={index + 1 === chats?.length} text={chat.transcribedAudioText} />
          <Chat isBot isCorrection createdAt={chat.createdAt} text={chat.correctedText} />
          <Chat isBot createdAt={chat.createdAt} isLastReply={index + 1 === chats?.length} text={chat.botReply} />
        </>
      ))}
    </div>
  );
}

ChatContainer.propTypes = {
  chats: PropTypes.array,
};

export default ChatContainer;
