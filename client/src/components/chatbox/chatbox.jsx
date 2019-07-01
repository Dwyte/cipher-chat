import React, { useState } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";

const ChatBox = () => {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    { name: "Alice", message: "Hello!" },
    { name: "Bob", message: "Hello! Wassup!" },
    {
      name: "You",
      message:
        "Libero repellendus inventore aliquam officiis quas. Quia tempore iste accusamus excepturi itaque dicta. Et quis laboriosam corporis voluptatem soluta. Labore consectetur magnam et rem voluptas. Maxime consequatur molestias possimus distinctio vel."
    },
    { name: "Alice", message: "How are you guys doin?" },
    { name: "Bob", message: "Pretty Cool" },
    { name: "Alice", message: "How are you guys doin?" },
    { name: "You", message: "Pretty Cool" },
    { name: "Alice", message: "How are you guys doin?" },
    { name: "Bob", message: "Pretty Cool" }
  ]);

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const newChat = [...chat];

    newChat.push({
      name: "You",
      message
    });

    setChat(newChat);

    setMessage("");
  };

  return (
    <div className="grid-container chatbox-container">
      <div className="chatbox">
        {chat.map(m => (
          <ChatBubble key={chat.indexOf(m)} {...m} />
        ))}
      </div>

      <div className="message-form">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            type="text"
          />
        </form>
      </div>

      <div className="message-submit">
        <button><i className="fas fa-paper-plane"></i></button>
      </div>
    </div>
  );
};

export default ChatBox;
