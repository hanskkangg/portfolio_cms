import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [hover, setHover] = useState(false); // ✅ Track hover state

    return (
        <Link 
            className={`text-gray-700 cursor-pointer dark:text-gray-100 transition-all duration-300 ease-in-out 
                ${hover ? 'translate-y-[-10px]' : 'translate-y-0 '}
            `}
            to={`/product/${id}`}
            onMouseEnter={() => setHover(true)}  // ✅ Detect hover enter
            onMouseLeave={() => setHover(false)} // ✅ Detect hover leave
        >
            {/* ✅ Image container with hover effects */}
            <div className='w-full h-[300px] overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg relative'>
                
                {/* ✅ Image with smooth transition */}
                <img 
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out 
                        ${hover ? 'scale-105 brightness-110' : 'scale-100'}
                    `}
                    src={hover && image[1] ? image[1] : image[0]} // ✅ Show second image on hover
                    alt={name} 
                />

                {/* ✅ Overlay Effect (Optional) */}
                <div 
                    className={`absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-500 ${hover ? 'opacity-50' : 'opacity-0'}`}
                ></div>
            </div>

            {/* ✅ Product Name & Price */}
            <p className='pt-3 pb-1 text-md text-black dark:text-gray-50'>{name}</p>
            <p className='text-sm font-medium dark:text-gray-300'>{currency} {price}</p>
        </Link>
    );
};

export default ProductItem;
