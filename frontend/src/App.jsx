import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrders from './pages/PlaceOrders';
import Orders from './pages/Orders';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import './sparkles.css'; // Import CSS for sparkles

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const createSparkle = () => {
      for (let i = 0; i < 5; i++) {  // Create TWO sparkles at a time (double amount)
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        // Random properties for size, duration, and movement
        sparkle.style.setProperty("--size", Math.random().toFixed(2)); // 0.0 - 1.0
        sparkle.style.setProperty("--duration", `${3 + Math.random() * 2}s`); // 3s - 5s
        sparkle.style.setProperty("--wind", Math.random().toFixed(2)); // 0.0 - 1.0

        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;

        // Remove after animation ends
        setTimeout(() => sparkle.remove(), 6000);
      }
    };

    // Reduce interval to 100ms (previously 200ms) to increase sparkle density
    const interval = setInterval(createSparkle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-[#ffffff] text-black"} 
      relative overflow-hidden`}
    >
      <ToastContainer />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrders />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
