import {model,Schema} from 'mongoose';
const productSchema = new Schema({
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    description:String,
    brand:String,
    price:Number,
    cost:Number,
    expired_date:String,
    stock:Number,
},{
    versionKey: false,
    timestamps: true
});

export default model('Product', productSchema);