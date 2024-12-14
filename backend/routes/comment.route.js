import express from 'express';
import { createComment, getAdvertisementComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getAdvertisementComments/:advertisementId', getAdvertisementComments);

export default router;