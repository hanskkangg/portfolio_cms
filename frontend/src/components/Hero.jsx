import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const imageArray = [assets.n17, assets.n18, assets.n20, assets.n19];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, imageArray.length]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    setAnimateText(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 200; 

      if (scrollPosition > triggerPoint) {
        setSlideUp(true);
      } else {
        setSlideUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='relative bg-[#fffff0] flex flex-col sm:flex-row items-start mt-10 overflow-hidden'>

      {/* Hero Left Side - All Text Aligned to the Left */}
      <div className='w-full sm:w-1/2 flex flex-col items-start justify-end p-4'>
        <div className='text-[#414141] text-left'>
          
          {/* Fancy Welcome Text with Spectral Font */}
          <h2
    className={`text-6xl lg:text-7xl font-semibold text-[#414141] mb-6 ml-10 mt-20 transition-all duration-1000 ease-out grape-nuts-font ${
        animateText && !slideUp
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
    }`}
>
    Welcome,
</h2>



          {/* Main Heading with Slide Down and Slide Up Animation */}
          <h1
            className={`prata-regular text-5xl sm:text-6xl lg:text-7xl leading-snug font-semibold text-[#414141] dark:text-gray-50 mb-8 ml-10 mt-20 transition-all duration-1000 ease-out ${
              animateText && !slideUp
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0'
            }`}
          >
            BAEYONDNAILS<br />
            ART AND<br />
            DESIGN
          </h1>

          {/* Secondary Description with Slide Down and Slide Up Animation */}
          <p
            className={`text-sm sm:text-base md:text-lg text-[#414141] dark:text-gray-300 max-w-md ml-10 mt-10 transition-all duration-1000 ease-out delay-200 ${
              animateText && !slideUp
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0'
            }`}
          >
            Based in Ottawa, we're happy to bring your creative nail art ideas to life. Join us for a day of inspiration and artistry.
          </p>

        </div>
      </div>

      {/* Hero Right Side with fixed image container and slower animation */}
      <div 
        className='w-full sm:w-1/2 h-[620px] overflow-hidden relative flex items-center justify-center'
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-[100%] h-[100%] flex items-center justify-center">
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
