import {v2 as cloudinary} from "cloudinary"

// Set Cloudinary configuration using environment variables
const connectCloudinary = async() => {

    cloudinary.config({

        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}


export default connectCloudinary;