import {
  updateUserService,
  deleteUserService,
} from "../services/userServices.js";

const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;
    data.userId = userId;
    let response = await updateUserService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(403).json(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await deleteUserService(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(403).json(error);
  }
};
export { updateUser, deleteUser };
