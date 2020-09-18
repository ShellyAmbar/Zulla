import React from "react";
import "./infoBar.css";

import onlineIcon from '../../icons/onlineIcon.png';
import CloseIcon from '@material-ui/icons/Close';

const InfoBar = ({room}) => {
  return (
    <div className="infoBarContainer">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online image"/>
        <h3>{room}</h3>

      </div>
      <div className="rightInnerContainer">
        <a href="/" ><CloseIcon style={{color:"white"}}/></a>
      </div>
    </div>
  );
};

export default InfoBar;
