import React from "react";
import "./userInRoom.css";

const UserInRoom = ({ user: { id, name, room } , color}) => {
  return (
    <div className="userInRoomCotainer" style={{color:`${color}`}}>
     
      <p style={{color:`${color}`, boxShadow: `0 0 30px ${color}`}} className="userCircularIndicator">{name.charAt(0)}</p>
      <p className="userInRoomName" style={{color:`${color}`}}>{name}</p>
      
    </div>
  );
};

export default UserInRoom;
