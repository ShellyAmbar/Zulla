const mongoose = require("mongoose");
const cameraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
});

module.exports = mongoose.model("Camera", cameraSchema);
