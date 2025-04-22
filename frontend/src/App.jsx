import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';

// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrders from './pages/PlaceOrders';
// import Orders from './pages/Orders';
// import Verify from './pages/Verify';

import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sparkles.css';

import TurnstileVerify from "./components/TurnstileVerify"; 

const App = () => {
  // Load dark mode preference from localStorage on initial load
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  
  // Tracks whether user has passed Turnstile verification
  const [isVerified, setIsVerified] = useState(false);

  
  // Toggles dark/light theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);


  
  // Creates animated sparkles
  useEffect(() => {
    const createSparkle = () => {
      // Create sparkles, we can change the amount by changing number to 1,2,3,4,5 etc..
      for (let i = 0; i < 3; i++) { 
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        // Random properties for size, duration, and movement
        sparkle.style.setProperty("--size", Math.random().toFixed(2)); 
        sparkle.style.setProperty("--duration", `${3 + Math.random() * 2}s`); 
        sparkle.style.setProperty("--wind", Math.random().toFixed(2)); 

        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;

        // Remove after animation ends
        setTimeout(() => sparkle.remove(), 6000);
      }
    };

    // Reduce interval to 200ms to increase sparkle density
    const interval = setInterval(createSparkle, 200);
    return () => clearInterval(interval);
  }, []);

  
  // Check if the user is verified with Turnstile
  useEffect(() => {
    const verifiedStatus = localStorage.getItem("turnstile_verified");
    if (verifiedStatus) {
      setIsVerified(true);
    }
  }, []);


  return (
    <div 
      className={`min-h-screen transition-colors duration-300 
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-[#ffffff] text-black"} 
      relative overflow-hidden`}
    >
      <ToastContainer />

      {!isVerified ? (
        <TurnstileVerify onSuccess={() => {
          setIsVerified(true);
          localStorage.setItem("turnstile_verified", "true");
        }} />
      ) : (
        <>
      
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />


        {/* Remove unused pages */}
        {/* <Route path='/cart' element={<Cart />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/place-order' element={<PlaceOrders />} /> */}
        {/* <Route path='/orders' element={<Orders />} /> */}
        {/* <Route path='/verify' element={<Verify />} /> */}
      </Routes>
      <Footer isDarkMode={isDarkMode} />
        </>
      )}
    </div>
  );
};

export default App;
