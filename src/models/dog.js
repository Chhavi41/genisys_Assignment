const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  imageName: { type: String, required: true },
  size: { type: Number, required: true},
  deleted: { type: Boolean}
});

module.exports = mongoose.model("Dog", DogSchema);