import { Router } from "express";

import {
  getUsers,
  addUser,
  getUserByName,
  deleteUser,
  updateUserByName,
} from "../controllers/users.controller";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:name", getUserByName);
router.post("/users", addUser);
router.delete("/users/:name", deleteUser);
router.put("/users/:name", updateUserByName);

export default router;
