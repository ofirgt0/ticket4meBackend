import { Router } from "express";

import {
  getUsers,
  addUser,
  getUserByName,
  deleteUser,
  updateUserByName,
} from "../controllers/users.controller";

import {
  addVerification,
  checkVerificationByName,
  updateVerification,
  removeVerification
} from "../controllers/usersVerify-controller";

const router = Router();

// Users table
router.get("/users", getUsers);
router.get("/users/:name", getUserByName);
router.post("/users", addUser);
router.delete("/users/:name", deleteUser);
router.put("/users/:name", updateUserByName);

// UsersVerify table
router.get('/users/checkVerification/:userName', checkVerificationByName)
router.post('/users/verify', addVerification)
router.put('/users/updateVerification/:userName', updateVerification)
router.delete('/users/removeVerification/:userName', removeVerification)

export default router;
