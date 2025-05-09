import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext);
  const [hover, setHover] = useState(false);

  return (
    
    // Whole product item is clickable and links to product details
    <Link
      className={`relative text-gray-700 cursor-pointer dark:text-gray-100 transition-all duration-300 ease-in-out 
                ${hover ? "translate-y-[-10px]" : "translate-y-0"}`}
      to={`/product/${id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Container */}
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        {/* Bestseller Badge (Positioned Lower) */}
        {bestseller && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md tracking-widest z-10 md:px-1 md:py-0.5">
            👑 Best Seller
          </span>
        )}

        {/* Image with Hover Effect */}
        <img
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out 
                        ${hover ? "scale-105 brightness-110" : "scale-100"}`}
          src={hover && image[1] ? image[1] : image[0]}
          alt={name}
        />
      </div>

      {/* Product Name */}
      <p className="pt-3 pb-1 text-md text-black dark:text-gray-50">{name}</p>

      {/* Product Price */}
      <p className="text-sm font-medium dark:text-gray-300">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
