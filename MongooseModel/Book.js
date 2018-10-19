const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// Mongoose Model
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
const bookSchema = new mongoose.Schema({
  title: String,
  author: String
});

// Export Mongoose "Book" model
module.exports = mongoose.model("Book", bookSchema);
