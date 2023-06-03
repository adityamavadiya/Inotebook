const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
// const func = async () => {
//   try {
//     await User.createIndexes();
//     console.log("Indexes created successfully.");
//   } catch (error) {
//     console.error("Error creating indexes:", error);
//   }
// };

// func();
module.exports = User;
