import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRoute = express.Router();

// Route to add a new product with multiple image uploads
productRoute.post('/add', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Route to remove a product
productRoute.post('/remove', removeProduct);

// Route to get a single product by ID
productRoute.post('/single', singleProduct);

// Route to list all products
productRoute.get('/list', listProducts);

export default productRoute;
