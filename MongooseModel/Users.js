const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// Mongoose Model
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const slot = new mongoose.Schema({
  beforeSchool: [String],
  morning: [String],
  noon: [String],
  afternoon: [String],
  afterSchool: [String],
  evening: [String],
  night: [String]
});

const userschema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: String,
  address: String,
  lat: Number,
  lng: Number,
  drivingLicense: Boolean,
  car: Boolean,
  nonSmoker: Boolean,
  profileTitle: String,
  profileDescription: String,
  children: Array,
  availability: slot
});

// Export Mongoose "User" model
module.exports = mongoose.model("User", userschema);
