import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chatRoomPage.css";
import InfoBar from "../../components/infoBar/infoBar";
import InputBar from "../../components/inputBar/inputBar";
import Messages from "../../components/messages/messages";
import UsersInRoom from "../../components/usersInRoom/usersInRoom";
import VideoAlert from "../../components/videoAlert/videoAlert";
import CameraIcon from "@material-ui/icons/VideoCall";
import Board from "../../components/draggableComponents/board/board";
import DraggableCard from "../../components/draggableComponents/card/card";
import ChatElement from "../../components/chat/chatElement";
import SideBar from "../../components/sideBar/sideBar";

let socket;

const ChatRoomPage = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [camerasWindows, setCamerasWindows] = useState([]);
  const [myCamera, setMyCamera] = useState([]);
  const [myCameraId, setMyCameraId] = useState("");
  const ENDPOINT = "localhost:8000";
  useEffect(() => {
    const { userName, roomName } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setUserName(userName);
    setRoomName(roomName.trim().toLowerCase());
    socket.emit("join", { name: userName, room: roomName }, (error) => {
      if (error) {
        alert(error);
      }
    });

    //on un mounting- when leaving the chat off
    return () => {
      socket.emit("disconnect");
      removeCamera();
      socket.off();
    };

    // console.log(socket);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", ({ room, users }) => {
      setUsers(users);
    });
  }, [users]);

  // func for sending message
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit(
        "sendMessage",
        { id: socket.id, name: userName, room: roomName, message },
        () => setMessage("")
      );
    }
  };

  const removeCamera = () => {
    socket.emit(
      "removeCamera",
      { id: socket.id, name: userName, room: roomName },
      ({ error, camera }) => {
        if (error) {
          alert(error);
        } else {
          console.log(
            `camera of user: ${userName} has been removed successfully.`
          );
          alert(`${userName}, camera is removed!`);
          if (camera) {
            console.log("recieved removed camera in chatroom ");
            if (camera.id === socket.id) {
              setMyCamera([]);
              setMyCameraId("");

              // camerasWindows.find((cameraWindow)=> cameraWindow.)
              console.log(camera.id, "id of the camera - removed myCamera.");
            }
            // close window of camera
          } else {
            console.log("no camera recieved in chatroom");
          }
        }
      }
    );
  };

  const addCamera = () => {
    socket.emit(
      "addCamera",
      { id: socket.id, name: userName, room: roomName },

      ({ error, camera }) => {
        if (error) {
          alert(error);
        } else {
          console.log(
            `camera of user: ${userName} has been added successfully.`
          );
          alert(`${userName}, camera is on!`);
          if (camera) {
            console.log("recieved added camera in chatroom ");

            if (camera.id === socket.id) {
              setMyCamera(camera);
              setMyCameraId(camera.id);
              console.log(camera.id, "id of the camera - added to myCamera.");
            }
            //open window with camera
          } else {
            console.log("no camera recieved in chatroom");
          }

          // open video
        }
      }
    );
  };

  const onPressOpenCameraButton = (event) => {
    event.preventDefault();
    console.log(isCameraOpen, "cam mod before");

    if (!isCameraOpen) {
      // add camera to socket
      setIsCameraOpen(!isCameraOpen);
      addCamera();
    } else {
      setIsCameraOpen(!isCameraOpen);
      removeCamera();
    }
  };

  useEffect(() => {
    socket.on("camerasData", ({ room, cameras }) => {
      //  console.log("cameras in camerasData", cameras);
      // console.log("room in camerasData", room);
      setCamerasWindows(cameras);
      // console.log(camerasWindows.length, " cameras lengt");
    });
  }, [camerasWindows]);

  useEffect(() => {
    socket.on("cameraVideoStreem", ({ room, camera, cameras }) => {
      // console.log("cameras in cameraVideoStreem -> chatroom", camera);
      //  console.log("room in cameraVideoStreem", room);

      setCamerasWindows(cameras);
    });
  }, [camerasWindows]);

  return (
    <div className="PageContainer">
      <div className="chatRoomPageContainer">
       
          {camerasWindows.map((cameraWindow) => {
            return (
              <ChatElement  id="VideoAlertElement"  width="300px" height="300px">
                <VideoAlert
                  key={cameraWindow.name}
                  id={cameraWindow.id}
                  data={cameraWindow.data}
                  name={cameraWindow.name}
                />
              </ChatElement>
            );
          })}
        
        <ChatElement  id="InfoBarElement" width="30%" height="60%">
          <InfoBar room={roomName} />
          <Messages messages={messages} name={userName} />
          <InputBar
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </ChatElement>

        <ChatElement  id="UsersInRoomElement" width="auto" height="60%">
          <UsersInRoom users={users} room={roomName} />
        </ChatElement>
        <SideBar />
      </div>

      <div className="openCamera">
        <button className="openCameraButton" onClick={onPressOpenCameraButton}>
          <CameraIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
