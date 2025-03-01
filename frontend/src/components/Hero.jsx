  import React from 'react';
  import { assets } from '../assets/assets';
  import { useNavigate } from 'react-router-dom';

  const Hero = () => {
    const imageArray = [assets.n17, assets.n18, assets.n20]; // Three images
    const navigate = useNavigate();

    return (
      <div 
        className="relative flex items-center justify-center min-h-screen bg-center bg-cover overflow-hidden"
        style={{ 
          backgroundImage: `url(${assets.bg_1})`, 
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          padding: '20px' // 10px margin left and right
        }} 
      >
        {/* Image Container */}
        <div className="flex gap-2 w-full h-full relative">
          {imageArray.map((image, index) => (
            <div 
              key={index} 
              className="flex-1 h-full overflow-hidden relative"
              style={{
                marginLeft: index === 0 ? '0' : '10px', 
                marginRight: index === imageArray.length - 1 ? '0' : '10px',
              }}
            >
              <img 
                className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
                src={image} 
                alt={`Image ${index + 1}`} 
              />
            </div>
          ))}
        </div>

      {/* Full-Screen Text Overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 text-center px-4">
    
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 z-0"></div>

    {/* Main Title */}
   {/* Main Title
<h1 className="relative z-30 text-[80px] md:text-[150px] font-bold leading-none mb-4 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
  BAEYOND NAILS
</h1> */}


    {/* Subtitle */}
    {/* <p className="relative z-30 text-lg md:text-2xl max-w-2xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
      Enhance your own light in the soft embrace of gentle glow
    </p> */}

    {/* Shop Now Button - Positioned Lower */}
    <button 
      className="absolute bottom-40 px-8 py-3 text-sm  border-2 border-white bg-transparent text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
      onClick={() => navigate('/collection')}
    >
      SHOP NOW
    </button>
  </div>
      </div>
    );
  };

  export default Hero;
