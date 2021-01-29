// import mongoose from "mongoose";
// import colors from "colors";
// import mockgoose from "mockgoose";

// const _connect = async () => {
//   try {
//     const db = await mongoose.connect(process.env.MONGO_DB, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`Mongodb connected: ${db.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error ${error.message}`.red.underline.bold);
//     process.exit(1);
//   }
// };
// export const connectDB = () => {
//   if (process.env.NODE_ENV === "development") {
//     _connect();
//   } else if (process.env.NODE_ENV === "test") {
//     const Mockgoose = mockgoose.Mockgoose;
//     const _mockgoose = new Mockgoose(mongoose);
//     _mockgoose.prepareStorage().then(() => {
//       _connect();
//     });
//   }
// };

// export const disconnectDB = () => {
//   console.log("Mongodb disconnected".cyan.underline);
//   return mongoose.disconnect();
// };

// export default { connectDB, disconnectDB };

import mongoose from "mongoose";
import colors from "colors";
import mockgoose from "mockgoose";

const _connect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB, dbProps);
    console.log(`Mongodb connected: ${db.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export const connectDB = () => {
  const dbProps = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  };
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      mongoose.connect(process.env.MONGO_DB, dbProps).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
    } else if (process.env.NODE_ENV === "test") {
      const Mockgoose = mockgoose.Mockgoose;
      const _mockgoose = new Mockgoose(mongoose);
      _mockgoose.prepareStorage().then(() => {
        mongoose.connect(process.env.MONGO_DB, dbProps).then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  });
};

export const disconnectDB = () => {
  console.log("Mongodb disconnected".cyan.underline);
  return mongoose.disconnect();
};

export default { connectDB, disconnectDB };
