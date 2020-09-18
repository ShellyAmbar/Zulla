import React, { useState } from "react";
import { Link } from "react-router-dom";
import './joinPage.css';

const JoinPage = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  return (
    <div className="joinContainer">
      <div className="joinInnerContainer">
        <h1 className="joinHeading">Join Zulla</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            onChange={(event) => setRoomName(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) =>
            (!userName || !roomName) ? event.preventDefault() : null
          }
          to={`/chatRoom?userName=${userName}&roomName=${roomName}`}
        >
          <button className="joinButton" type="submit">
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinPage;
