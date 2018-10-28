const { buildSchema } = require("graphql");

module.exports = new buildSchema(`
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
    children: String,
    availabilities: String
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    getUser(email: String): User
    addUser(firstName: String, lastName: String, avatar: String, email: String, address: String, postCode: String, city: String, profileTitle: String, profileDescription: String, children: String, availabilities: String): User!
    updateUser(_id: String, firstName: String, lastName: String, avatar: String, email: String, address: String, postCode: String, city: String, profileTitle: String, profileDescription: String, children: String, availabilities: String): User!
    removeUser(_id: String!): User!
  }
`);
