const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
// Import GraphQL components
const schema = require("./schema");
const resolvers = require("./resolvers");

// Import configuration and connect to DB
const { dbURL, dbName } = require("./config");
mongoose.connect(dbURL + "/" + dbName);

// Define "context" just for testing
const context = {
  greeting: "Hello world!"
};

// Set up Express server
const app = express();

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    context: context,
    graphiql: true
  })
);
var port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
// app.listen(4000);
// console.log("Running a GraphQL API server at localhost:4000/graphql");
