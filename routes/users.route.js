import { Router } from "express";

import {
  getUsers,
  addUser,
  getUserByName,
  deleteUser,
} from "../controllers/users.controller";
const router = Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.get("/users/:uname", getUserByName);
router.delete("/users/:name", deleteUser);
//router.patch("/users:name",update)

export default router;
