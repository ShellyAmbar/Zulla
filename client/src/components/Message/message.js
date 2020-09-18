import React from "react";
import "./message.css";
import  ReactEmoji from 'react-emoji';


const Message = ({ message: { user, text, time }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyRight  ">
      <p className="sentText ">{trimmedName}</p>
      <div className="messageBox backgroundBlue ">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text) }</p>
      </div>
      <p className="smallText colorWhite ">{time}</p>
    </div>
  ) : (
    <div className="messageContainer justifyLeft floatleft ">
      <p className="sentText">{user}</p>
      <div className="messageBox backgroundLight  ">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="smallText colorWhite ">{time}</p>
    </div>
  );
};

export default Message;
