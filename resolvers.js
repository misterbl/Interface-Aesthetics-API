const User = require("./MongooseModel/Users");
const Course = require("./MongooseModel/Courses");

const resolvers = {
  hello: (args, context) => {
    return context.greeting;
  },
  users: async (args, context) => {
    // See "greeting: 'Hello world!'" in Terminal
    console.log(context);

    return await User.find();
  },
  courses: async (args, context) => {
    // See "greeting: 'Hello world!'" in Terminal
    console.log(context);

    return await Course.find();
  },
  getUser: async (args, context) => {
    const foundUser = await User.findOne({ email: args.email });
    console.log("foundUser", foundUser);
    return foundUser;
  },
  getUserById: async (args, context) => {
    const foundUser = await User.findOne({ _id: args._id });
    return foundUser;
  },
  addUser: async (args, context) => {
    console.log("addUser", args);
    var newUser = new User({
      firstName: args.firstName,
      lastName: args.lastName,
      books: args.books,
      avatar: args.avatar,
      email: args.email,
      address: args.address,
      drivingLicense: args.drivingLicense,
      nonSmoker: args.nonSmoker,
      car: args.car,
      profileTitle: args.profileTitle,
      profileDescription: args.profileDescription,
      children: args.children,
      availability: args.availability
    });
    var err = await newUser.save();
    if (err) return err;
    console.log("newUser", newUser);
    return newUser;
  },
  updateUser: async (args, context) => {
    console.log("updateUserArgs", args);
    if (args.child) {
      args.child = JSON.parse(args.child);
      await User.updateOne(
        { _id: args._id },
        { $push: { children: args.child } }
      ).exec();
    } else if (args.availability) {
      args.availability = JSON.parse(args.availability);
      await User.updateOne(
        {
          _id: args._id
        },
        { availability: args.availability }
      ).exec();
    } else {
      await User.updateOne({ _id: args._id }, args).exec();
    }
    const updatedUser = await User.findById(args._id);
    console.log("updatedUser", updatedUser);

    return updatedUser;
  },

  removeUser: async (args, context) => {
    var doc = await User.findOneAndRemove({
      _id: args._id
    });

    return doc;
  },

  getAllCourses: async () => {
    const foundCourses = await Course.find();
    console.log("foundCourses", foundCourses);
    return foundCourses;
  }
};

module.exports = resolvers;
