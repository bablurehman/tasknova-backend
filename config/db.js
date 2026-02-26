import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected Successfully"),
    );
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Database Connection Failed!", error.message);
    process.exit(1);
  }
};

export default connectDB;
