import { v2 as cloudinary } from "cloudinary"
import productModels from "../models/productModels.js"


//function to add product
const addProduct = async(req,res) =>{
    try {

        // Extract product details from request body    
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body


        // Extract uploaded images from request
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)


        // Upload images to Cloudinary and get URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )


        // Prepare product data for saving
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);



        // Create and save the new product in the database
        const product = new productModels(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// function for list product
const listProducts = async (req, res) => {
    try {
        
        // Retrieve all products from the database
        const products = await productModels.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        // Delete product from database by ID
        await productModels.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        // Extract product ID from request body
        const { productId } = req.body

        // Find product by ID in the database
        const product = await productModels.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }