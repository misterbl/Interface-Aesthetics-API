const { buildSchema } = require("graphql");

module.exports = new buildSchema(`
  type Child {
    id:  String,
    name: String,
    dob: Int,
    gender: String,
    school: String,
    information: String
  }
  input ChildInput {
    id:  String,
    name: String,
    dob: Int,
    gender: String,
    school: String,
    information: String
  }
  type Slot {
    beforeSchool: [String]
    morning: [String]
    noon: [String]
    afternoon: [String]
    afterSchool: [String]
    evening: [String]
    night: [String]
  }
  input SlotInput {
    beforeSchool: [String]
    morning: [String]
    noon: [String]
    afternoon: [String]
    afterSchool: [String]
    evening: [String]
    night: [String]
  }
  type User {
    _id: String!
    firstName: String,
    lastName: String,
    avatar: String,
    email: String,
    address: String,
    lat: Float,
    lng: Float,
    drivingLicense: Boolean,
    nonSmoker: Boolean,
    car: Boolean,
    profileTitle: String,
    profileDescription: String,
    children: [Child]
    availability: Slot
    unavailability: [String]
  }
  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    getUser(email: String): User
    getUserById(_id: String): User
    addUser(firstName: String, lastName: String, avatar: String, email: String, address: String,lat: String, lng: String, drivingLicense: Boolean, car: Boolean, nonSmoker: Boolean, profileTitle: String, profileDescription: String, children: [ChildInput], availability: SlotInput): User!
    updateUser(_id: String, firstName: String, lastName: String, avatar: String, email: String, address: String, lat: String, lng: String,drivingLicense: Boolean, car: Boolean, nonSmoker: Boolean, profileTitle: String, profileDescription: String, children: String, child: String, availability: String unavailability: [String]): User!
    updateAvatar(_id: String, avatar: String): User!
    removeChild(_id: String, child: String,): User!
    updateChild(_id: String, child: String,): User!
    removeUser(_id: String!): User!
  }
`);
