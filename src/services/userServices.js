import User from "../models/Users.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
let updateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.password) {
        data.password = CryptoJS.AES.encrypt(
          JSON.stringify(data.password),
          process.env.SECRET_PASS
        ).toString();
      }
      let user = await User.findByIdAndUpdate(
        data.userId,
        {
          $set: data,
        },
        { new: true }
      );
      resolve({
        data: user,
        errCode: 0,
        message: "Update user successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: -1,
          message: "Parameter input required !",
        });
      }
      await User.deleteOne({
        _id: userId,
      });
      resolve({
        errCode: 0,
        message: "Delete user successfully !",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export { updateUserService, deleteUserService };
