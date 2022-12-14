import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from '../../../components/Chat';
import { getFontSize } from '../../../hooks/useCustomFont';
import { compareStrings, compareCorrection } from '../../../lib/utils';
import Audio from '../../../components/Audio';
function ChatContainer({ chats, isLoading }) {
  const [fontSize] = getFontSize();

  return (
    <div
      className="w-full max-w-7xl mx-auto pt-10 relative flex flex-col justify-center px-0 sm:px-4 space-y-2"
      style={{ fontSize: `${fontSize}px` }}
    >
      {chats?.map((chat, index) => (
        <Fragment key={chat.createdAt}>
          {chat.audio && <Audio audio={chat.audio} />}

          {chat.transcribedAudioText === chat.correctedText ? (
            <>
              <Chat correct createdAt={chat.createdAt} text={chat.transcribedAudioText} />
            </>
          ) : (
            <>
              <Chat
                isCorrection
                createdAt={chat.createdAt}
                text={compareStrings(chat.transcribedAudioText, chat.correctedText)}
              />
              <Chat
                createdAt={chat.createdAt}
                isCorrectionHeader
                text={compareCorrection(chat.correctedText, chat.transcribedAudioText)}
              />
            </>
          )}

          <Chat isBot isLastReply={index + 1 === chats?.length} createdAt={chat.createdAt} text={chat.botReply} />
        </Fragment>
      ))}
    </div>
  );
}

ChatContainer.propTypes = {
  chats: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ChatContainer;
