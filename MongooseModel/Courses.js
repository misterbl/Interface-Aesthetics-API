const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// Mongoose Model
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const courseschema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  image: String
});

module.exports = mongoose.model("Course", courseschema);
