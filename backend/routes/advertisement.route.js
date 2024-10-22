import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deleteAdvertisement, getAdvertisements, updateAdvertisement } from "../controllers/advertisement.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getadvertisements', getAdvertisements);
router.delete('/deleteadvertisement/:advertisementId/:userId', verifyToken, deleteAdvertisement);
router.put('/updateadvertisement/:advertisementId/:userId', verifyToken, updateAdvertisement);

export default router;