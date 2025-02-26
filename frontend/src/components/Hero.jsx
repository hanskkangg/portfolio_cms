import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  // Image assets array for easy management
  const imageArray = [assets.n17, assets.n18, assets.n20, assets.n19];
  
  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to control whether animation is paused
  const [isPaused, setIsPaused] = useState(false);

  // Function to handle image click and cycle through the images
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  // Automatic image transition every 5 seconds (5000 ms)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, imageArray.length]);

  // Function to handle dot click
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='relative bg-[#fffff0] flex flex-col sm:flex-row items-start mt-10'>

      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex flex-col items-end justify-end p-4'>
        <div className='text-[#414141] text-right'>

          {/* Main Heading */}
          <h1 className='prata-regular text-5xl sm:text-6xl lg:text-7xl leading-snug font-extrabold text-[#414141] dark:text-gray-50 mb-8 mr-1'>
            BAEYOND<br/>
            NAIL ART<br/>
            DESIGNS
          </h1>

          {/* Secondary Description */}
          <p className='text-sm sm:text-base md:text-lg text-[#414141] dark:text-gray-300 max-w-md mr-1'>
            Based in Ottawa, we're happy to bring your creative nail art ideas to life. Join us for a day of inspiration and artistry.
          </p>

        </div>
      </div>

      {/* Hero Right Side with fixed image container and slower animation */}
      <div 
        className='w-full sm:w-1/2 h-[600px] overflow-hidden relative mb-12 flex items-center justify-center'
        onMouseEnter={() => setIsPaused(true)} // Pause animation on hover
        onMouseLeave={() => setIsPaused(false)} // Resume animation when hover is removed
      >
        <div className="w-[90%] h-[100%] flex items-center justify-center">
          <img 
              className='w-full h-full object-cover cursor-pointer transition-all duration-3000 ease-in-out rounded-3xl' 
              src={imageArray[currentImageIndex]} 
              alt={`Image ${currentImageIndex + 1}`} 
              onClick={handleImageClick} 
          />
        </div>

        {/* Dots for Image Navigation */}
        <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2'>
            {imageArray.map((_, index) => (
                <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        index === currentImageIndex
                        ? 'bg-gray-800 dark:bg-gray-200 scale-110'
                        : 'bg-gray-400 dark:bg-gray-500'
                    }`}
                ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
