import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    return (
        <div className='w-full my-20 bg-white dark:bg-gray-900'> 
            {/* Section Title */}
            <div className='text-center py-8 text-black dark:text-white'>
                <h2 className='text-4xl md:text-3xl font-bold text-[#414141] prata-regular mb-1'>
                    - LATEST COLLECTIONS -
                </h2>
                {/* <p className='w-3/4 m-auto text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400'>
                    Nokia today announced that it has acquired Rapid’s technology assets, 
                    including the world’s largest API marketplace, and its highly skilled team.
                </p> */}
            </div>

            {/* Product Grid */}
            <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-20'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection;
