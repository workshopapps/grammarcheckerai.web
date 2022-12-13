import React from 'react';

function ChatInput() {
  return (
    <div className="w-full  max-w-[1000px] mx-auto flex space-x-4">
      <div className="w-full">
        <input className="w-full border h-full rounded-[10px] px-4 active:shadow-sm focus:shadow-sm outline-none" />
      </div>
      <div>
        <button className="h-[62px] w-full px-10 min-w-[180px] max-w-[200px] font-bold text-[#5D387F] bg-[#E8DDF2] rounded-[8px]">
          Reset Chat
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
