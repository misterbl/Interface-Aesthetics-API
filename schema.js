const { buildSchema } = require("graphql");

module.exports = new buildSchema(`
  type Course {
    _id: String!
    title: String
    description: String
    price: String
    image: String
  }
  type User {
    _id: String!
    firstName: String,
    lastName: String,
    avatar: String,
    email: String,
    address: String,
  }
  type Query {
    hello: String
    users: [User]
    courses: [Course]
    getCourseById(_id: String): Course
  }

  type Mutation {
    getUser(email: String): User
    getUserById(_id: String): User
    addUser(firstName: String, lastName: String, avatar: String, email: String, address: String): User!
    updateUser(_id: String, firstName: String, lastName: String, avatar: String, email: String, address: String): User!
    updateAvatar(_id: String, avatar: String): User!
    removeUser(_id: String!): User!
    getCourse(_id: String): Course!
    addCourse(title: String, description: String, price: String, image: String): Course!
    updateCourse( _id: String, title: String, description: String, price: String, image: String): Course!
    removeCourse( _id: String!): Course!
  }
`);
