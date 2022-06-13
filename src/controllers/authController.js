import jwt from "jsonwebtoken";
import {
  registerUserService,
  loginUserService,
} from "../services/authServices.js";

const registerUser = async (req, res) => {
  try {
    let data = req.body;
    let response = await registerUserService(data);
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e.reason);
  }
};
const loginUser = async (req, res) => {
  try {
    let data = req.body;
    let response = await loginUserService(data);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  try {
    if (authHeader) {
      jwt.verify(authHeader, process.env.JWT_PASS, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid !");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authentication!");
    }
  } catch (e) {
    console.log(e.reason);
  }
};
const verifyTokenAndAuthorized = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allow to to that");
    }
  });
};

export { registerUser, loginUser, verifyToken, verifyTokenAndAuthorized };
