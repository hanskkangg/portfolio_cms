import mongoose from "mongoose";


// Function to connect to MongoDB   
const connectDB = async() => {

    // Show message when MongoDB is connected
    mongoose.connection.on('connected', ()=> {
        console.log("Mongo DB connected");
    })

    // Connect to MongoDB using URI from environment variable
    await mongoose.connect(`${process.env.MONGODB_URI}/e_com`)


}

export default connectDB;