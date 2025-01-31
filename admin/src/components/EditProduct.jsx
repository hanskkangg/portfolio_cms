import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = ({ token }) => {
    const { productId } = useParams(); // Get product ID from URL params
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        bestseller: false,
        sizes: [],
        image: []
    });

    const [newImages, setNewImages] = useState([]);

    // 🔹 Fetch product details when the page loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
                if (response.data.success) {
                    setProduct(response.data.product);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Error fetching product details');
            }
        };

        fetchProduct();
    }, [productId]);

    // 🔹 Handle input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // 🔹 Handle image selection
    const handleImageChange = (e) => {
        setNewImages([...e.target.files]); // Store selected images
    };

    // 🔹 Submit updated product
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('subCategory', product.subCategory);
            formData.append('bestseller', product.bestseller);
            formData.append('sizes', JSON.stringify(product.sizes));

            // Append new images (if selected)
            newImages.forEach((image, index) => {
                formData.append(`image${index + 1}`, image);
            });

            const response = await axios.post(`${backendUrl}/api/product/update`, formData, { headers: { token } });

            if (response.data.success) {
                toast.success('Product updated successfully');
                navigate('/list'); // Redirect to product list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error updating product');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <h2 className="text-xl font-bold">Edit Product</h2>

            {/* Product Name */}
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={onChangeHandler} required />

            {/* Product Description */}
            <label>Product Description</label>
            <textarea name="description" value={product.description} onChange={onChangeHandler} required />

            {/* Product Price */}
            <label>Product Price ($)</label>
            <input type="number" name="price" value={product.price} onChange={onChangeHandler} required />

            {/* Product Category */}
            <label>Category</label>
            <select name="category" value={product.category} onChange={onChangeHandler}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>

            {/* Sub-Category */}
            <label>Sub-Category</label>
            <select name="subCategory" value={product.subCategory} onChange={onChangeHandler}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>

            {/* Bestseller Toggle */}
            <label>
                <input type="checkbox" checked={product.bestseller} onChange={() => setProduct({ ...product, bestseller: !product.bestseller })} />
                Mark as Bestseller
            </label>

            {/* Current Images */}
            <label>Current Images</label>
            <div className="flex gap-2">
                {product.image.map((img, index) => (
                    <img key={index} src={img} alt="Product" className="w-20 h-20 object-cover rounded" />
                ))}
            </div>

            {/* Upload New Images */}
            <label>Upload New Images (Optional)</label>
            <input type="file" multiple onChange={handleImageChange} />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
        </form>
    );
};

export default EditProduct;
