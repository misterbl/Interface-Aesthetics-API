const { MongoClient } = require("mongodb");
const assert = require("assert");
const { dbURL, dbName, collectionName } = require("./config.js");

let user = {
  firstName: "userTestFirstName",
  lastName: "userTestLastName",
  address: "userTestAddress",
  profileTitle: "userTestProfileTitle",
  profileDescription: "userTestProfileDescription",
  children: ["userTestChild1", "userTestChild2"],
  availabilities: ["userTestAvailavility1", "userTestAvailavility2"]
};

// Connect to the server
MongoClient.connect(
  dbURL,
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.insertOne(user, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Documents inserted!");
      }

      client.close();
    });
  }
);
