import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [hover, setHover] = useState(false); // ✅ Track hover state

    return (
        <Link 
            className='text-gray-700 cursor-pointer dark:text-gray-100' 
            to={`/product/${id}`}
            onMouseEnter={() => setHover(true)}  // ✅ Detect hover enter
            onMouseLeave={() => setHover(false)} // ✅ Detect hover leave
        >
            {/* ✅ Image container with fixed size */}
            <div className='w-full h-[300px] overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg'>
                <img 
                    className='w-full h-full object-cover transition-transform duration-300 ease-in-out' // ✅ Keep consistent size
                    src={hover && image[1] ? image[1] : image[0]} // ✅ Show second image if available
                    alt={name} 
                />
            </div>

            {/* ✅ Product Name & Price */}
            <p className='pt-3 pb-1 text-md text-black dark:text-gray-50'>{name}</p>
            <p className='text-sm font-medium dark:text-gray-300'>{currency} {price}</p>
        </Link>
    );
};

export default ProductItem;
