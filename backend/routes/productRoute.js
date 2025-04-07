import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoute = express.Router();

// Admin route to add a new product with up to 4 images
productRoute.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);


// Admin route to update existing product and its images
productRoute.put('/update/:productId', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), updateProduct);


// Admin route to remove a product
productRoute.post('/remove', adminAuth, removeProduct);

// Public route to fetch a single product by its ID
productRoute.get('/single/:productId', singleProduct);

// Public route to get the list of all products
productRoute.get('/list', listProducts);

export default productRoute;
