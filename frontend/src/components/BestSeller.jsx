import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]); 

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellers(bestProduct.slice(0, 10));
  }, [products]);

  
  return (
    <div className='my-10 bg-[#Ffffff] dark:bg-gray-900 transition-colors duration-300 pb-20'>

      {/* Title Section */}
      <div className='text-center py-8 dark:text-white'>
                
                {/* Title with Grape Nuts Font and Bigger Size */}
                <h2 className=' prata-regular text-4xl md:text-3xl font-bold text-[#414141] mb-4'>
                  - BEST SELLERS -
                </h2>
                
                {/* <p className='w-3/4 m-auto text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400'>
                    Nokia today announced that it has acquired Rapid’s technology assets, 
                    including the world’s largest API marketplace, and its highly skilled team.
                </p> */}
      </div>

      {/* Rendering Best Sellers */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-20 mt-5'>
        {bestSellers.map((item, index) => (
          <ProductItem 
            key={index} 
            id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price}
            className="dark:border-gray-700 dark:text-white"
          />
        ))}
      </div>
      
      {/* Extra Space at the Bottom */}
      <div className="h-"></div>
      
    </div>
  );
};

export default BestSeller;
