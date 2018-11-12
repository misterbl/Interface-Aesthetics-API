const User = require("./MongooseModel/Users");

const resolvers = {
  hello: (args, context) => {
    return context.greeting;
  },
  users: async (args, context) => {
    // See "greeting: 'Hello world!'" in Terminal
    console.log(context);

    return await User.find();
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
      await User.updateOne({
        _id: args._id,
        availability: args.availability
      }).exec();
    } else {
      await User.updateOne({ _id: args._id }, args).exec();
    }
    const updatedUser = await User.findById(args._id);
    console.log("updatedUser", updatedUser);

    return updatedUser;
  },

  removeChild: async (args, context) => {
    console.log("removeChild", args);
    args.child = JSON.parse(args.child);
    await User.updateOne(
      { _id: args._id },
      { $pull: { children: args.child } }
    ).exec();
    const updatedUser = await User.findById(args._id);
    return updatedUser;
  },

  updateChild: async (args, context) => {
    console.log("updateChild", args);
    args.child = JSON.parse(args.child);
    await User.updateOne(
      { _id: args._id },
      { $set: { "children.$[child]": args.child } },
      { arrayFilters: [{ "child.id": args.child.id }], upsert: true }
    ).exec();
    const updatedUser = await User.findById(args._id);
    return updatedUser;
  },

  removeUser: async (args, context) => {
    var doc = await User.findOneAndRemove({
      _id: args._id
    });

    return doc;
  }
};

module.exports = resolvers;
