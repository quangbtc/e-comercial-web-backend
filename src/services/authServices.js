import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import CryptoJS from "crypto-js";
let registerUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = new User({
        username: data.username,
        email: data.email,
        password: CryptoJS.AES.encrypt(
          JSON.stringify(data.password),
          process.env.SECRET_PASS
        ).toString(),
        lastName: data.lastName,
        firstName: data.firstName,
        phoneNumber: data.phoneNumber,
      });
      await user.save();
      resolve({
        errCode: 0,
        message: "Create user successfully!",
      });
    } catch (error) {
      reject(e);
    }
  });
};
const loginUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        username: data.username,
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "Wrong user!",
        });
      }
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_PASS
      );
      const originPassword = JSON.parse(
        hashedPassword.toString(CryptoJS.enc.Utf8)
      );
      if (originPassword !== data.password) {
        resolve({
          errCode: 2,
          message: "Wrong password!",
        });
      }
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_PASS
      );
      const { password, ...others } = user._doc;
      resolve({
        errCode: 0,
        message: "Login success !",
        others,
        accessToken,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export { registerUserService, loginUserService };
