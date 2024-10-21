import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getAdvertisements } from "../controllers/advertisement.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getadvertisements', getAdvertisements);

export default router;