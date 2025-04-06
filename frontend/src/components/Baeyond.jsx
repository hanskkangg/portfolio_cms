import React, { useEffect, useState, useRef } from "react";

const Baeyond = () => {
  // State to manage animation
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.3 } // Trigger animation when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen bg-[#fff3ea] flex flex-col items-center justify-center text-center overflow-x-hidden"
    >
      <h1
        className={`text-5xl md:text-7xl mt-30 font-bold text-pink-800 mb-6 transition-all duration-1000 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        About Our Company
      </h1>

      <p
        className={`text-lg md:text-2xl text-pink-700 max-w-3xl mb-8 px-4 transition-all duration-1000 ease-out delay-200 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        At Baeyondnails, we are committed to delivering the finest products and
        exceptional service. Our journey began with a passion for excellence and
        a dedication to our customers' satisfaction. We strive to innovate and
        bring the best of quality and design to everyone, every day.
      </p>

      <p
        className={`text-md md:text-lg text-pink-500 max-w-2xl mb-6 px-4 transition-all duration-1000 ease-out delay-400 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        Our mission is to enrich lives by providing products that inspire and
        connect with our community. We believe in creating lasting relationships
        with our customers through trust, quality, and creativity.
      </p>

      <p
        className={`text-sm md:text-base text-pink-500 max-w-lg px-4 transition-all duration-1000 ease-out delay-600 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        Join us on our journey to make the world a more vibrant and beautiful
        place, one product at a time!
      </p>
    </div>
  );
};

export default Baeyond;
