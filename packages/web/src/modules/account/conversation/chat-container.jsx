import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from '../../../components/Chat';
import { getFontSize } from '../../../hooks/useCustomFont';

function ChatContainer({ chats, noRive }) {
  const [fontSize] = getFontSize();

  return (
    <div
      className="w-full max-w-7xl mx-auto pt-10 relative flex flex-col justify-center px-0 sm:px-4 space-y-2"
      style={{ fontSize: `${fontSize}px` }}
    >
      {chats?.map((chat, index) => (
        <Fragment key={chat.createdAt}>
          <Chat
            noRive={noRive}
            createdAt={chat.createdAt}
            isLastReply={index + 1 === chats?.length}
            text={chat.transcribedAudioText}
          />
          <Chat
            noRive={noRive}
            isBot
            isLastReply={index + 1 === chats?.length}
            isCorrection
            createdAt={chat.createdAt}
            text={chat.correctedText}
          />
          <Chat noRive={noRive} isBot createdAt={chat.createdAt} text={chat.botReply} />
        </Fragment>
      ))}
    </div>
  );
}

ChatContainer.propTypes = {
  chats: PropTypes.array,
  noRive: PropTypes.bool,
};

export default ChatContainer;
