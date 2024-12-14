import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, advertisementId, userId } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'you are not allowed to create this comment'));
        }

        const newComment = new Comment({
            content,
            advertisementId,
            userId,
        });

        await newComment.save();
        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
};

export const getAdvertisementComments = async (req, res, next) => {

    try {

        const comments = await Comment.find({ advertisementId: req.params.advertisementId }).sort({
            createdAt: -1,
        });

        res.status(200).json(comments);

    } catch (error) {
        next(error);
    }

};