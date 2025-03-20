import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <div className='w-full my-[-5%] xl:my-[10%] bg-white dark:bg-gray-900'>
            {/* Section Title */}
            <div className='text-center py-8 text-black dark:text-white'>
                <h2 className='text-4xl md:text-3xl font-bold text-[#414141] prata-regular mb-1'>
                    - LATEST COLLECTIONS -
                </h2>
            </div>

            {/* Product Grid with 2 Columns on Small Screens */}
            <div className='mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-3 sm:px-10'>
            
                {
                    latestProducts.map((item, index) => (
                        <div key={index} className="w-full aspect-square">
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default LatestCollection;
