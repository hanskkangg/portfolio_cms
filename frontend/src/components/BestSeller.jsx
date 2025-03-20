import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]); 

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellers(bestProduct.slice(0, 6));
  }, [products]);

  return (
    <div className='my-10 bg-[#ffffff] dark:bg-gray-900 transition-colors duration-300 pb-20'>
      {/* Title Section */}
      <div className='text-center py-8 dark:text-white'>
        <h2 className='prata-regular text-4xl md:text-3xl font-bold text-[#414141] mb-1'>
          - BEST SELLERS -
        </h2>
      </div>

      {/* Product Grid - Ensuring Square Images */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-3 sm:px-10 mt-5'>
        {bestSellers.map((item, index) => (
          <div key={index} className="w-full aspect-square">
            <ProductItem 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price}
              className="dark:border-gray-700 dark:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
