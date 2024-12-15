import express from 'express';
import { createComment, getComments, getAdvertisementComments, likeComment, editComment, deleteComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getcomments', verifyToken, getComments);
router.get('/getAdvertisementComments/:advertisementId', getAdvertisementComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;