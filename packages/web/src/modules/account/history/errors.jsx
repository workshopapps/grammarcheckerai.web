import React from 'react';
import PropTypes from 'prop-types';
import ChatContainer from '../conversation/chat-container';

function Errors({ data }) {
  console.log(data);
  return (
    <div>
      <div className="bg-[#F6F6F6] rounded-lg pt-4 pb-3 sm:px-4">
        <ChatContainer chats={[data]} />
      </div>
    </div>
  );
}
Errors.propTypes = {
  id: PropTypes.number,
  data: PropTypes.object,
};

export default Errors;
