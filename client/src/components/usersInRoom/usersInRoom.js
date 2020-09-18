import React, { useState } from "react";
import "./usersInRoom.css";
import UserInRoom from "../userInRoom/userInRoom";
import { colors } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

const colorsPalet = [
  "#e8eaf6",
  "#c5cae9",
  "#9fa8da",
  "#7986cb",
  "#5c6bc0",
  "#3f51b5",
  "#3949ab",
  "#303f9f",
  "#283593",
  "#1a237e",
  "#8c9eff",
  "#536dfe",
];
let rand = 0;

const UsersInRoom = ({ users, room }) => {
  return (
    <div className="usersInRoomContainer">
      <ScrollToBottom className="scrollToBottom">
        {users != null ? (
          users.map((user, index) => (
            <div key={index}>
              <UserInRoom user={user} color={colorsPalet[index % 12]} />
            </div>
          ))
        ) : (
          <div>
            <h2 style={{ color: "white" }}>There is no users to show</h2>
          </div>
        )}
      </ScrollToBottom>
    </div>
  );
};

export default UsersInRoom;
