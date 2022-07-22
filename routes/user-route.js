import { Router } from "express";

import {
    getUserByName,
    addUser,
    updateUserByName,
    deleteUser,
} from "../controllers/user-controller.js";

const router = Router();

router.get("/:name", getUserByName);
router.post("/register", addUser);
router.put("/update/:name", updateUserByName);
router.delete("/delete/:name", deleteUser);

export default router;
