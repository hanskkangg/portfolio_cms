import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const imageArray = [assets.n17, assets.n18, assets.n20]; // Three images
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover overflow-hidden px-4 sm:px-6 md:px-8 xl:mt-10 mt-[0%]"
      style={{
        backgroundImage: `url(${assets.bg_1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Image Container using Grid (Fixes Gap Issue) */}
      <div className="grid grid-cols-3 gap-2 xl:gap-6 w-full h-full min-h-[70vh] sm:min-h-screen mt-[-25%] xl:mt-0">
        {imageArray.map((image, index) => (
          <div key={index} className="w-full h-full overflow-hidden flex-grow">
            <img
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Full-Screen Text Overlay (Now Closer to Top) */}
      <div className="absolute inset-0 flex flex-col items-center justify-start text-white z-20 text-center px-4 pt-10 sm:pt-0">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-0"></div>

        {/* Main Title */}
        {/* Uncomment the title if needed */}
        {/* <h1 className="relative z-30 text-5xl sm:text-[80px] md:text-[150px] font-bold leading-none mb-4 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
          BAEYOND NAILS
        </h1> */}

        {/* Subtitle */}
        {/* <p className="relative z-30 text-base sm:text-lg md:text-2xl max-w-2xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
          Enhance your own light in the soft embrasce of gentle glow
        </p> */}

        {/* Shop Now Button (Adjusted for Smaller Screens) */}
        <button
          className="absolute bottom-[40%] sm:bottom-32 px-3 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-2 border-white bg-transparent shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 mt-[10%] text-white md:bottom-80 xl:bottom-[25%]"
          onClick={() => navigate("/collection")}
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Hero;
