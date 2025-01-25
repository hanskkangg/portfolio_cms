import express from 'express'
import  { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController'

const productRoute = express.Router();

productRoute.post('')


// Route to add a new product
productRouter.post('/add',addProduct);

// Route to remove a product
productRouter.post('/remove',removeProduct);

// Route to get a single product by ID
productRouter.post('/single',singleProduct);

// Route to list all products
productRouter.get('/list',listProducts)

export default productRouter