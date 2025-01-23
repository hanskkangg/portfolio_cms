import React, { useContext, useEffect, useState } from 'react'; // Import React and hooks
import { ShopContext } from '../context/ShopContext'; // Import ShopContext for global product data
import Title from './Title'; // Import Title component
import ProductItem from './ProductItem'; // Import ProductItem component

// Component to display related products based on category and subcategory
const RelatedProducts = ({ category, subCategory }) => {

    // Get products data from ShopContext
    const { products } = useContext(ShopContext);
    
    // State to store related products
    const [related, setRelated] = useState([]);

    // Function to find related products
    useEffect(() => {
        if (products.length > 0) {
            
            let productsCopy = products.slice(); // Create a copy of the products array
            
            // Filter products that match the same category
            productsCopy = productsCopy.filter((item) => category === item.category);
            
            // Filter products that match the same subcategory
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Take the first 5 related products and set them in state
            setRelated(productsCopy.slice(0, 5));
        }
        
    }, [products]); // Run this effect when 'products' change

    return (
        <div className='my-24'>
            {/* Title for the related products section */}
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            {/* Display related products in a grid layout */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
