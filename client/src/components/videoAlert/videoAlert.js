import "./videoAlert.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Draggable from "react-draggable";

import React, { useState } from "react";

function VideoAlert(props) {
  return (
    <div className="cameraWindow">
      <Card
        style={{
          backgroundColor: "#030b30",
          color: "#fff",
          width: "100%",
          height: "100%",
          margin: "5px",
        }}
      >
        <p className="cameraWindowTitle">{props.name}</p>

        <img
          src={`data:image/jpeg;base64,${props.data}`}
          style={{ width: "100%", height: "100%" }}
        ></img>
      </Card>
    </div>
  );
}

export default VideoAlert;
