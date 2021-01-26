import mongoose from "mongoose";
import colors from "colors";

const getConnectionString = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return process.env.MONGO_DB;
    case "test":
      return process.env.MONGO_DB_TEST;
    case "production":
      return process.env.MONGO_DB_PROD;
  }
};
export const connectDB = async () => {
  try {
    const connectionString = getConnectionString();
    const db = await mongoose.connect(connectionString, {
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
