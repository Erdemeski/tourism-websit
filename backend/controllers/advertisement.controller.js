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