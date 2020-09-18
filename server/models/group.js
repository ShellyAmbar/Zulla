const mongoose = require("mongoose");
const groupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  users: mongoose.Types.Array,
  cameras: mongoose.Types.Array,
});

module.exports = mongoose.model("Group", groupSchema);
