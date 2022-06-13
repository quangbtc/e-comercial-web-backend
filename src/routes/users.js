import { updateUser, deleteUser } from "../controllers/userController.js";
import { verifyTokenAndAuthorized } from "../controllers/authController.js";
const userRoutes = (app) => {
  app.put("/api/user/update/:id", verifyTokenAndAuthorized, updateUser);
  app.delete("/api/user/delete/:id", verifyTokenAndAuthorized, deleteUser);
};
export default userRoutes;
