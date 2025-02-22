import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connect.. ");
  } catch (err) {
    console.log("error connect mongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
