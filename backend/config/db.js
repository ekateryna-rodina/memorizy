import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongodb connected: ${db.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
