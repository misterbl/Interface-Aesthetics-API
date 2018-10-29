const { buildSchema } = require("graphql");

module.exports = new buildSchema(`
type Child {
  name: String,
  dob: String,
  school: String,
  information: String
}
input ChildInput {
  name: String,
  dob: String,
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
    postCode: String, 
    city: String,
    profileTitle: String,
    profileDescription: String,
    childern: [Child]
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    getUser(email: String): User
    addUser(firstName: String, lastName: String, avatar: String, email: String, address: String, postCode: String, city: String, profileTitle: String, profileDescription: String, childern: [ChildInput], availabilities: String): User!
    updateUser(_id: String, firstName: String, lastName: String, avatar: String, email: String, address: String, postCode: String, city: String, profileTitle: String, profileDescription: String, childern: [ChildInput], availabilities: String): User!
    removeUser(_id: String!): User!
  }
`);
