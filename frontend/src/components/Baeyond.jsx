import React from 'react';

const Baeyond = () => {
    return (
        <div className="w-screen h-screen bg-[#fff3ea] flex flex-col items-center justify-center text-center overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-bold text-pink-800 mb-6">
                About Our Company
            </h1>
            <p className="text-lg md:text-2xl text-pink-700 max-w-3xl mb-8 px-4">
                At Baeyond, we are committed to delivering the finest products and exceptional service.
                Our journey began with a passion for excellence and a dedication to our customers' satisfaction.
                We strive to innovate and bring the best of quality and design to everyone, every day.
            </p>
            <p className="text-md md:text-lg text-pink-500 max-w-2xl mb-6 px-4">
                Our mission is to enrich lives by providing products that inspire and connect with our community.
                We believe in creating lasting relationships with our customers through trust, quality, and creativity.
            </p>
            <p className="text-sm md:text-base text-pink-500 max-w-lg px-4">
                Join us on our journey to make the world a more vibrant and beautiful place, one product at a time!
            </p>
        </div>
    );
};

export default Baeyond;
