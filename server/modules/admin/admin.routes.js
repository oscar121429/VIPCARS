import express from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import adminController from "./admin.controller.js";

const router = express.Router();

router.get('/getAllUsers',verifyToken, adminController.getAllUsers);
router.put('/blockUser/:user_id', verifyToken, adminController.blockUser);

export default router;