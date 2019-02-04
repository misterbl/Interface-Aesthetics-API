const { MongoClient } = require("mongodb");
const assert = require("assert");
const { dbURL, dbName, collectionName } = require("./config.js");

let course = {
  title: "FOUNDATION COURSE IN BOTULINUM TOXIN & DERMAL FILLER",
  description:
    "The approach towards the lower face is often one of the most undervalued and misunderstood. Our lower face masterclass is an in-depth hands-on course and an excellent opportunity for current level 7 students and more experienced injectors to build confidence in an often overlooked range of procedures. Our lower face masterclass is ideal for doctors, dentists, nurses and many other medical professionals.",
  image:
    "https://www.harleyacademy.com/wp-content/uploads/2019/02/level-7-fd-day-YES.jpg",
  link: "/courses",
  price: "9000"
};
let course2 = {
  title: "Fillers",
  description:
    "The approach towards the lower face is often one of the most undervaexperienced injectors to build confidence in an often overlooked range oflass is ideal for doctors, dentists, nurses and many other medical professionals.",
  image:
    "https://www.harleyacademy.com/wp-content/uploads/2019/02/level-7-fd-day-YES.jpg",
  link: "/courses",
  price: "9000"
};
let course3 = {
  title: "Botox",
  description:
    "The approach towards the lower facellent opportunity for current level 7 students and more experienced injectors to build confidence in an often overlooked range of procedures. Our lower face masterclass is ideal for doctors, dentists, nurses and many other medical professionals.",
  image:
    "https://www.harleyacademy.com/wp-content/uploads/2019/02/level-7-fd-day-YES.jpg",
  link: "/courses",
  price: "9000"
};

// Connect to the server
MongoClient.connect(dbURL, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  collection.insertOne(course, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Documents inserted!");
    }
  });

  collection.insertOne(course2, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Documents inserted!");
    }
  });
  collection.insertOne(course3, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Documents inserted!");
    }

    client.close();
  });
});
