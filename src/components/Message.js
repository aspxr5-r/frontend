import React from 'react';

function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      <p>{message.text}</p>
    </div>
  );
}

export default Message;