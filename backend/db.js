const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Aditya:mongo@nodeexpressprojects.arzxqzu.mongodb.net/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable command buffering
    });
    console.log(`Mongodb connected successfully!!`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
  }
};

module.exports = connectToMongo;
