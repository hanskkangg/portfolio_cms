import mongoose from "mongoose";

const connectDB = async() => {

    mongoose.connection.on('connected', ()=> {

        console.log("Mongo DB connected");


    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e_com`)


}

export default connectDB;