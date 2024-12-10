import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    shortTitle: {
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
    content: {
        type: String,
        required: true
    },
    includings: {
        type: String,
        default: null
    },
    whatToExpect: {
        type: String,
        default: null
    },
    additionalInfos: {
        type: String,
        default: null
    },
    isPayLater: {
        type: Boolean,
        required: true,
        default: false
    },
    isMobileTicket: {
        type: Boolean,
        required: true,
        default: false
    },
    isPickUp: {
        type: Boolean,
        required: true,
        default: false
    },
    isDuration: {
        type: Boolean,
        required: true,
        default: false
    },
    durationInfo: {
        type: String,
        default: null
    },
    isStartTime: {
        type: Boolean,
        required: true,
        default: false
    },
    startTimeInfo: {
        type: String,
        default: null
    },
    isEndTime: {
        type: Boolean,
        required: true,
        default: false
    },
    endTimeInfo: {
        type: String,
        default: null
    },
    isOfferedLng: {
        type: Boolean,
        required: true,
        default: false
    },
    offeredLngInfo: {
        type: String,
        default: null
    },
    location: {
        type: String,
        required: true
    },
    locationZone: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        default: null
    },
    previousPriceGBP: {
        type: String,
        default: null
    },
    currentPriceGBP: {
        type: String,
        required: true
    },
    childDiscountGBP: {
        type: String,
        default: null
    },
    infantPriceGBP: {
        type: String,
        default: null
    },
    previousPriceTRY: {
        type: String,
        default: null
    },
    currentPriceTRY: {
        type: String,
        required: true
    },
    childDiscountTRY: {
        type: String,
        default: null
    },
    infantPriceTRY: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;