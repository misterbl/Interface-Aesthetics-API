const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// Mongoose Model
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const userschema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: String,
  address: String
});

// Export Mongoose "User" model
module.exports = mongoose.model("User", userschema);
