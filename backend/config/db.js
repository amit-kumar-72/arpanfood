import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://amit:arpanfood123@cluster0.mf1ysv5.mongodb.net/arpanfood');
    console.log(" MongoDB connected successfully.");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.