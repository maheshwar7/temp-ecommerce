const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Please Provide product name'],
        maxlenght:[100,'Name can not be more than 100 character']
    },
    price:{
        type:Number,
        required:[true,'Please Provide product price'],
        default:0
    },
    description:{
        type:String,
        required:[true,'Please Provide product description'],
        maxlenght:[1000,'Description can not be more than 1000 character']
    },
    image:{
        type:String,
        default:'/uploads/example.jpeg'
    },
    category:{
        type:String,
        required:[true,'Please Provide product category'],
        enum:['office','kitchen','bedroom']
    },
    company:{
        type:String,
        required:[true,'Please Provide company'],
        enum:{
            values:['ikea','liddy','marcos'],
            messageg:'{VALUE} is not supported'
        }
    },
    colors:{
        type:[String],
        default:['#222'],
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    inventory:{
        type:Number,
        required:true,
        default:15
    },
    averageRating:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
    

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

ProductSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false
})

ProductSchema.pre('remove', async function (next) {
    console.log('BEFORE DELETING REVIEW');
    await this.model('Review').deleteMany({ product: this._id });
    console.log('AFTER DELETING REVIEW');
  });
module.exports = mongoose.model('Product',ProductSchema)