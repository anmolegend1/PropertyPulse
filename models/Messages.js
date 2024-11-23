import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
    sender:{
       type: Schema.Types.ObjectId,
       ref:'User',
       required: [true, "Sender is required"],
    },
    recipient:{
       type: Schema.Types.ObjectId,
       ref:'User',
       required: [true, "Reciever is required"],
    },
    property:{
       type: Schema.Types.ObjectId,
       ref:'Property',
       required: [true, "Property is required"],

    },
    email:{
        type: String,
        required: [true, "Email is required"],
    },
    phone:{
       type: String,
    },
    read:{
        type: Boolean,
        default: false
    },
    message:{
       type: String,
       required: [true, "Message is required"],
    },
},{
    timestamps:true
});

const Message= models.Message || model('Message', MessageSchema);

export default Message