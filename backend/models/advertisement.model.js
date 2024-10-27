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
        default: 'https://firebasestorage.googleapis.com/v0/b/tourism-website-2a634.appspot.com/o/1730046481809-stock_Image.png?alt=media&token=aeaef6e4-fd41-4777-828c-78bf42e1cb8e'
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    location: {
        type: String,
        required: true
    },
    previousPrice: {
        type: String,
        default: null
    },
    currentPrice: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;