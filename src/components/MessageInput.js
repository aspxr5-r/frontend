import React, { useState } from 'react';

function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending message
    setMessage('');
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message Webcoach AI..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;