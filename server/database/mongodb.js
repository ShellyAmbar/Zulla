const mongoose = require("mongoose");
const express = require("express");
import User from "../models/user";
import Camera from "../models/camera";
import Group from "../models/group";

const connectToDataBase = () => {
  mongoose
    .connect(
      "mongodb+srv://shelly_ambar:" +
        process.env.MONGO_ATLAS_PW +
        "@node-rest-zulla-xpe4a.mongodb.net/test?retryWrites=true&w=majority" +
        { useMongoClient: true }
    )
    .finally(() => {
      if (
        mongoose.connection.readyState === mongoose.ConnectionStates.connected
      ) {
        return { success: "the connection to db succedded." };
      } else {
        return { error: "the connection to db failed." };
      }
    });
};

const disconnectFromDataBase = () => {
  mongoose.disconnect().finally(() => {
    if (
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected
    ) {
      return { success: "the disconnection to db succedded." };
    } else {
      return { error: "the disconnection to db failed." };
    }
  });
};

const addUser = ({ name }, callback) => {
  const user = new User({
    id: new mongoose.Types.ObjectId(),
    name,
  });
  user
    .save()
    .then((result) => {
      console.log(result, " in user added to mongoDB");
      callback({ user: user });
    })
    .catch((err) => {
      console.log(err, " in user added to mongoDB");
      callback({ error: err });
    });
};
const removeUser = ({ id, name }, callback) => {};

const addGroup = ({ id, name, users, cameras }, callback) => {
  const group = new Group({
    id: new mongoose.Types.ObjectId(),
    name,
    users,
    cameras
  });
  group
    .save()
    .then((result) => {
      console.log(result, " in group added to mongoDB");
      callback({ group: group });
    })
    .catch((err) => {
      console.log(err, " in group added to mongoDB");
      callback({ error: err });
    });
};
const removeGroup = ({ id }, callback) => {};
const addUserToGroup = ({ groupId, id, name }, callback) => {};
const isGroupExist = ({ id }) => {};

const addCameraToGroup = ({ groupId, id, name }, callback) => {
  const camera = new Camera({
    id: new mongoose.Types.ObjectId(),
    name,
  });
  camera
    .save()
    .then((result) => {
      console.log(result, " in camera added to mongoDB");
      callback({ camera: camera });
    })
    .catch((err) => {
      console.log(err, " in camera added to mongoDB");
      callback({ error: err });
    });
};
const removeCameraFromGroup = ({ groupId, id }, callback) => {};
const isCameraExist = ({ id }) => {};

module.exports = {
  connectToDataBase,
  disconnectFromDataBase,
  addUser,
  removeUser,
  addGroup,
  removeGroup,
  addCameraToGroup,
  removeCameraFromGroup,
  addUserToGroup,
  isCameraExist,
  isGroupExist,
};
