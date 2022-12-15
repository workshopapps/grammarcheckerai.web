import React from 'react';
import PropTypes from 'prop-types';
import ChatContainer from '../conversation/chat-container';

function Errors({ data }) {
  return (
    <div className="rounded-lg pt-4 pb-3 sm:px-4">
      <ChatContainer chats={[data]} />
    </div>
  );
}
Errors.propTypes = {
  data: PropTypes.object,
};

export default Errors;
