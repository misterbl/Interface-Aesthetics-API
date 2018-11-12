const express = require("express");
const graphqlHTTP = require("express-graphql");
const User = require("./MongooseModel/Users");

const mongoose = require("mongoose");
const cors = require("cors");
// Import GraphQL components
const schema = require("./schema");
const resolvers = require("./resolvers");
const bodyParser = require("body-parser");
// Import configuration and connect to DB
const { dbURL, dbName } = require("./config");

mongoose.connect(
  dbURL + "/" + dbName,
  { useNewUrlParser: true }
);
// mongoose.connect(
//   "mongodb://heroku_09clv9w4:umbj5436ut2mm3prek019135md@ds155663.mlab.com:55663/heroku_09clv9w4",  { useNewUrlParser: true }
// );
// Define "context" just for testing
const context = {
  greeting: "Hello world!"
};

// Set up Express server
const app = express();
var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 2000,
  type: "application/json"
});
// var urlencodedParser = bodyParser.urlencoded({
//   extended: true,
//   limit: 1024 * 1024 * 20,
//   type: "application/x-www-form-urlencoding"
// });

// app.use(jsonParser);
//  app.use(urlencodedParser);

// app.use(bodyParser.json({ limit: "500mb" }));
// app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
// app.use(bodyParser.text({ type: "application/graphql" }));
// app.use(bodyParser.json({ limit: "500mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});
// app.post("/upload", cors(), async (req, res, next) => {
//   User.updateOne({ _id: req.body.id }, { avatar: req.body.file }).exec();
//   // const updatedUser = await User.findById(req._id);
//   // next();
// });

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
app.use(jsonParser);

var port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 4000");
});
// app.listen(4000);
// console.log("Running a GraphQL API server at localhost:4000/graphql");
