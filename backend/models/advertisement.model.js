import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/510-5107959_travel-vector-png-travel-vector-images-png-transparent.png'
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;