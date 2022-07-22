import { Router } from "express";

import {
    addVerification,
    getVerificationByName,
    updateVerification,
    deleteVerification
} from "../controllers/usersVerify-controller.js";

const router = Router();

router.get('/get/:userName', getVerificationByName)
router.post('/add', addVerification)
router.put('/update/:userName', updateVerification)
router.delete('/delete/:userName', deleteVerification)

export default router;
