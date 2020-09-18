import React from "react";
import "./messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/message";





const Messages = ({ messages, name }) => (
  <ScrollToBottom
    
    className="messagesContainer"
    
  >
    {messages.map((message, index) => (
      <Message key={index} message={message} name={name} />
    ))}
  </ScrollToBottom>
);

export default Messages;
