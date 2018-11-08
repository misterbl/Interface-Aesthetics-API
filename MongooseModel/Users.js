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
  address: String,
  drivingLicense: Boolean,
  car: Boolean,
  nonSmoker: Boolean,
  profileTitle: String,
  profileDescription: String,
  children: Array,
  availabilities: String
});

// Export Mongoose "User" model
module.exports = mongoose.model("User", userschema);
