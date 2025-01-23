import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Get product ID from URL
import { ShopContext } from '../context/ShopContext'; // Import global ShopContext
import { assets } from '../assets/assets'; // Import icons and images
import RelatedProducts from '../components/RelatedProducts'; // Import related products component

const Product = () => {
  // Get productId from the URL
  const { productId } = useParams();

  // Get products data and addToCart function from ShopContext
  const { products, currency, addToCart } = useContext(ShopContext);

  // State for storing product data
  const [productData, setProductData] = useState(null);

  // State for storing selected product image
  const [image, setImage] = useState('');

  // State for storing selected size
  const [size, setSize] = useState('');

  // Function to find product data based on the productId from URL
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item); // Set the product details
        setImage(item.image[0]); // Set the first image as default
        return null;
      }
    });
  };

  // Call fetchProductData when productId or products change
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Show the product details if productData exists
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/*Product Display Section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images Section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          {/* Small product image thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                  alt="" 
                />
              ))
            }
          </div>

          {/* Large main product image */}
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>

        </div>

        {/*Product Information Section*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* Product Ratings */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>

          {/* Product Price */}
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

          {/* Product Description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} 
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          {/* Extra Information */}
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✔️High-end quality</p>
            <p>🚚You can pay at the door</p>
            <p>🔄Return and Refund Policy </p>
          </div>
        </div>
      </div>

      {/*Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
          Hi, I’m Hans Kang, a web developer who loves building web applications, exploring new technologies, and continuously learning. When I’m free, you can catch me here working on projects, sharing my learning journey, and experimenting with new ideas. I’m currently diving into frameworks like React, which I plan to implement here as I learn. React was outside the scope of my college studies, but I’m excited to get hands-on experience and bring it to life on this webpage.
          </p>
          <p>
          Hi, I’m Hans Kang, a web developer who loves building web applications, exploring new technologies, and continuously learning. When I’m free, you can catch me here working on projects, sharing my learning journey, and experimenting with new ideas. I’m currently diving into frameworks like React, which I plan to implement here as I learn. React was outside the scope of my college studies, but I’m excited to get hands-on experience and bring it to life on this webpage.
          </p>
        </div>
      </div>

      {/* Display Related Products*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>; 
};

export default Product;
