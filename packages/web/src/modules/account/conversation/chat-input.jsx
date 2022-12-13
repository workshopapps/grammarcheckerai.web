import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton } from '@mui/material';

function ChatInput() {
  const [text, setText] = React.useState('');
  const handleTextMsg = (ev) => {
    ev.preventDefault();
    if (text.trim()) {
      console.log('omo');
      setText('');
    }
  };
  return (
    <div className="w-full px-5 max-w-[1000px] mx-auto flex space-x-4">
      <form className="w-full relative" onSubmit={handleTextMsg}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something about the weather"
          className="w-full border text-[#5A5A5A] h-full rounded-[10px] px-4 active:shadow-sm focus:shadow-sm outline-none"
        />
        <div className="absolute top-3 right-3">
          <IconButton type="sumbit" disabled={!text}>
            <AiOutlineSend />
          </IconButton>
        </div>
      </form>

      <div>
        <button className="h-[62px] w-full px-10 min-w-[180px] max-w-[200px] font-bold text-[#5D387F] bg-[#E8DDF2] rounded-[8px]">
          Reset Chat
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
