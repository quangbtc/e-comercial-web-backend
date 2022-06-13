import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Connected to mongoose !");
    })
    .catch((err) => {
      console.log(err.reason);
    });
};
export default connectDB;
