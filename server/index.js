const express = require("express");
const socketio = require("socket.io");
const cv = require("opencv4nodejs");
const mogoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
const {
  addCamera,
  removeCamera,
  getCamera,
  getCamerasInRoom,
  changeCameraInCameras,
  isCameraInRoom,
} = require("./cameras.js");

//const PORT = process.env.PORT || 5000;
const PORT = "8000";
const currentLocalIp = "0.0.0.0";
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const FPS = 10;
app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  // console.log('We have a new connection');

  socket.on("join", ({ name, room }, callback) => {
    //  console.log(userName,roomName);
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const currentTime = hours + ":" + min;
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to the room "${room}".`,
      time: currentTime,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
      time: currentTime,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", ({ id, name, room, message }, callback) => {
    const { error, user } = getUser({ id: socket.id });
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const currentTime = hours + ":" + min;
    if (id != null) {
      io.to(room).emit("message", {
        user: name,
        text: message,
        time: currentTime,
      });
      console.log(name, message, room, "send message in index");
    } else {
      console.log(error);
    }
    callback();
  });

  socket.on("addCamera", ({ id, name, room }, callback) => {
    const { errorCamera, camera } = addCamera({
      id: socket.id,
      name,
      room,
    });

    //  console.log(camera, "camera added in index");

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const currentTime = hours + ":" + min;

    if (errorCamera) return callback({ error: errorCamera });

    // inform everyone
    if (camera) {
      //   console.log(camera, "server camera");

      io.to(room).emit("message", {
        user: "admin",
        text: `${name} opened the camera!`,
        time: currentTime,
      });
      io.to(room).emit("camerasData", {
        room: camera.room,
        cameras: getCamerasInRoom(room),
      });

      addInterval(camera);
    }

    callback({ camera });
  });

  const addInterval = (camera) => {
    var index = 0;
    const wCap = new cv.VideoCapture(0);
    wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
    wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

    var myCameraStreemInterval = setInterval(() => {
      const frame = wCap.read();
      const image = cv.imencode(".jpg", frame).toString("base64");
      const newCamera = {
        id: camera.id,
        name: camera.name,
        room: camera.room,
        data: image,
      };
      const newCamerasArray = changeCameraInCameras({
        room: camera.room,
        cameraToRemove: camera,
        cameraToAdd: newCamera,
      });
      index += 1;
      console.log(index, "interval index");
      io.to(camera.room).emit("cameraVideoStreem", {
        room: camera.room,
        camera: newCamera,
        cameras: getCamerasInRoom(camera.room),
      });
      if (!getCamera(camera.id)) {
        wCap.release();
        clearInterval(myCameraStreemInterval);
      }
    }, 1000 / FPS);
  };

  socket.on("removeCamera", ({ id, name, room }, callback) => {
    console.log(id, socket.id);
    const { errorCamera, camera } = removeCamera(id);

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const currentTime = hours + ":" + min;
    //  console.log(camera, "camera - removeCamera server");

    if (errorCamera) return callback({ error: errorCamera });
    // inform everyone

    if (camera) {
      //  console.log(camera, "server camera");

      io.to(room).emit("message", {
        user: "admin",
        text: `${name} removed the camera!`,
        time: currentTime,
      });

      io.to(room).emit("camerasData", {
        room: room,
        cameras: getCamerasInRoom(room),
      });

      isToStopIntervalStreemVideo = true;
    }

    callback({ camera });
  });

  socket.on("disconnect", () => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const currentTime = hours + ":" + min;
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room!`,
        time: currentTime,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      io.to(user.room).emit("camerasData", {
        room: user.room,
        cameras: getCamerasInRoom(user.room),
      });
    }
  });
});



//server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
server.listen(PORT, currentLocalIp, () =>
  console.log(`server has started on port ${PORT} , ${currentLocalIp}`)
);
