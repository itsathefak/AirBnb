const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new schema({
  email: {
    type: String,
    required: true,
  },
});
// No need to define password and username as it automatically gets created by passport local mongoose
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
