const cameras = [];
const addCamera = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingCamera = cameras.find(
    (camera) => camera.room === room && camera.name === name
  );
  if (existingCamera) {
    return { errorCamera: "Oops..the camera is already opened." };
  }

  const camera = { id, name, room, data:"" };
  cameras.push(camera);
 // console.log(cameras.length, "cameras");
  return  {camera} ;
};
const removeCamera = (id) => {
  const index = cameras.findIndex((camera) => camera.id === id);
 // console.log(index, "index of removed camera");
  if (index != -1) {
    return {camera: cameras.splice(index, 1)[0]};
  }else{
    return {errorCamera: "Oops..the camera is already removed."}
  }
};

const getCamera = (id) => {
  return cameras.find((camera) => camera.id === id);
};

const isCameraInRoom=(id)=>{
  return cameras.find((camera) => camera.id === id)?true:false;
}

const getCamerasInRoom = (room)=>{
    return cameras.filter((camera)=>camera.room === room);
}
const changeCameraInCameras = ({room, cameraToRemove, cameraToAdd})=>{

  var index = cameras.findIndex((camera)=> camera.id === cameraToRemove.id);
  cameras[index] = cameraToAdd;
  
  return cameras;

}



module.exports = { addCamera, removeCamera, getCamera , getCamerasInRoom,changeCameraInCameras,isCameraInRoom};
