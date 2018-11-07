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
      postCode: args.postCode,
      city: args.city,
      profileTitle: args.profileTitle,
      profileDescription: args.profileDescription,
      children: args.children,
      availabilities: args.availabilities
    });
    var err = await newUser.save();
    if (err) return err;
    return newUser;
  },
  updateUser: async (args, context) => {
    console.log("updateUseArgs", args);
    if (args.child) {
      args.child = JSON.parse(args.child);
      await User.updateOne(
        { _id: args._id },
        { $push: { children: args.child } }
      ).exec();
    } else {
      await User.updateOne({ _id: args._id }, args).exec();
    }
    const updatedUser = await User.findById(args._id);
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

  updateAvatar: async (args, context) => {
    console.log("updateAvatar", args);
    await User.update({ _id: args._id }, args).exec();
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
