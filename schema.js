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
  type User {
    _id: String!
    firstName: String,
    lastName: String,
    avatar: String,
    email: String,
    address: String,
    drivingLicense: Boolean,
    nonSmoker: Boolean,
    car: Boolean,
    profileTitle: String,
    profileDescription: String,
    children: [Child]
    availabilities: String
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    getUser(email: String): User
    getUserById(_id: String): User
    addUser(firstName: String, lastName: String, avatar: String, email: String, address: String, drivingLicense: Boolean, car: Boolean, nonSmoker: Boolean, profileTitle: String, profileDescription: String, children: [ChildInput], availabilities: String): User!
    updateUser(_id: String, firstName: String, lastName: String, avatar: String, email: String, address: String, drivingLicense: Boolean, car: Boolean, nonSmoker: Boolean, profileTitle: String, profileDescription: String, children: String, child: String, availabilities: String,): User!
    updateAvatar(_id: String, avatar: String): User!
    removeChild(_id: String, child: String,): User!
    updateChild(_id: String, child: String,): User!
    removeUser(_id: String!): User!
  }
`);
