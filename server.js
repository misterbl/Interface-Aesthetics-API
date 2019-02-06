const express = require("express");
const graphqlHTTP = require("express-graphql");
const User = require("./MongooseModel/Users");
const Course = require("./MongooseModel/Courses");
const uuid = require("uuid");
const mongoose = require("mongoose");
const cors = require("cors");
// Import GraphQL components
const schema = require("./schema");
const resolvers = require("./resolvers");
const bodyParser = require("body-parser");
// Import configuration and connect to DB
const { dbURL, dbName } = require("./config");
var path = require("path");

mongoose.connect(dbURL + "/" + dbName, { useNewUrlParser: true });
// mongoose.connect(
//   "mongodb://heroku_09clv9w4:umbj5436ut2mm3prek019135md@ds155663.mlab.com:55663/heroku_09clv9w4",
//   { useNewUrlParser: true }
// );
// Define "context" just for testing
const context = {
  greeting: "Hello world!"
};

// Set up Express server
const app = express();
const fs = require("fs");

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
// app.use(bodyParser.json({ limit: "500mb" }));
app.use((req, res, next) => {
  //  res.header("Access-Control-Allow-Origin", "https://kidappi.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});
app.post("/upload", (req, res, next) => {
  User.updateOne({ _id: req.body.id }, { avatar: req.body.file }).exec();
  res.send(200);
  next();
});

app.post("/uploadCourseImage", (req, res, next) => {
  const extension = path.extname(req.body.imageName);
  console.log(extension);
  const guid = uuid();
  fs.writeFile(`/tmp/${guid}${extension}`, req.body.image, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  Course.updateOne(
    { _id: req.body._id },
    { image: `${guid}${extension}` }
  ).exec();
  res.send(`${guid}${extension}`);
  next();
});

app.get("/getCourseImage", (req, res, next) => {
  console.log("request", req.query.image);

  fs.readFile(`/tmp/${req.query.image}`, "utf8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

var port = process.env.PORT || 4001;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 4001");
});
// app.listen(4000);
// console.log("Running a GraphQL API server at localhost:4000/graphql");
