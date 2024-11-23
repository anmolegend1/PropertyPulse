import mongoose from "mongoose";

let connected= false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //check if connected, and if connected then return and dont try to connect again
    if(connected) {
        console.log('MongoDB is already connected')
        return
    };

    //connect to mongodb
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;