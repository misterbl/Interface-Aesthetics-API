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
  addUser: async (args, context) => {
    var newUser = new User({
      firstName: args.firstName,
      lastName: args.lastName,
      address: args.address,
      profileTitle: args.profileTitle,
      profileDescription: args.profileDescription,
      children: args.children,
      availabilities: args.availabilities
    });

    var err = await newUser.save();

    if (err) return err;
    console.log(newUser);
    return newUser;
  },
  updateUser: async (args, context) => {
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
