import React, { useState } from "react";
import "./inputBar.css";
import SendIcon from "@material-ui/icons/NearMe";
import { Picker } from 'emoji-mart';
import "emoji-mart/css/emoji-mart.css";

const InputBar = ({ message, setMessage, sendMessage }) => {
  
  const [isToShowEmojis, setIsToShowEmojis] = useState(false);
  const addEmoji = (e) => {
    let emoji = e.native;
    setMessage(message +""+ emoji);
    setIsToShowEmojis(false);
  };
  const onImojiPickerClicked = () => {
    setIsToShowEmojis(! isToShowEmojis);
  };

  return (

    <form className="inputBarContainer">

      <input
        className="inputContainer"
        type="text"
        placeholder="Type a message.."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />

{isToShowEmojis ? (
          <span  >
            <Picker
              onSelect={addEmoji}
              emojiTooltip={true}
              
            />
          </span>
        ) : (
          <p className="iconButtonStyle" onClick={onImojiPickerClicked}>
            {String.fromCodePoint(0x1f60a)}
          </p>
        )}


      <button
        className="iconButtonStyle"
        onClick={(event) => sendMessage(event)}
      >
        <SendIcon style={{ color: "white" }} />
      </button>
    </form>
  );
};

export default InputBar;
