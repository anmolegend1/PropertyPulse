import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
    
        owner:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required: [true, "Owner is required"],
        },
        name:{
            type: String,
            required: [true, "Name is required"],
        },
        description:{
            type:String,
        },
        location:{
            street:String,
            city:String,
            state:String,
            zipcode:String,
        },
        beds:{
            type:Number,
            required: [true, "Beds is required"],
        },
        square_feet:{
            type:Number,
            required: [true, "Square Feet is required"],
        },
        amenities:[
            {
                type: String,
            }
            
        ],
        rates:{
            nighlty:Number,
            weekly:Number,
            monthly:Number, 
        },
        seller_info:{
            name:String,
            email:String,
            phone:String,
        },
        images:[
            
        {
            type: String,
        }
            
        ],
        is_featured:{
            type:Boolean,
            default: false,
        },
},{
    timestamps:true
});

const Property= models.Property || model('Property', PropertySchema);

export default Property