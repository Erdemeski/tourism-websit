import Advertisement from "../models/advertisement.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create an advertisement'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g, '');
    const newAdvertisement = new Advertisement({
        ...req.body, slug, userId: req.user.id
    });

    try {
        const savedAdvertisement = await newAdvertisement.save();
        res.status(201).json(savedAdvertisement);
    } catch (error) {
        next(error);
    }
};

export const getAdvertisements = async (req, res, next) => {

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const advertisements = await Advertisement.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalAdvertisements = await Advertisement.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthAdvertisements = await Advertisement.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });


        res.status(200).json({
            advertisements,
            totalAdvertisements,
            lastMonthAdvertisements,
        });

    } catch (error) {
        next(error);
    }

};


export const deleteAdvertisement = async (req, res, next) => {

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this advertisement'));
    }
    try {
        await Advertisement.findByIdAndDelete(req.params.postId);
        res.status(200).json('The advertisement has been deleted');
    } catch (error) {
        next(error);
    }

};