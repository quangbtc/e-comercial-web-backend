import { registerUser, loginUser } from "../controllers/authController.js";
const authRoutes = (app) => {
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
};
export default authRoutes;
