import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex flex-col items-center justify-between py-3 font-medium bg-[#FFFFFF] dark:bg-gray-900 dark:text-white transition-colors duration-300 px-5 w-full">
      {/* Top Section: Search Bar | Logo | Icons */}
      <div className="flex items-center justify-between w-full max-w-6xl">
        {/* Search Bar (Left) */}
        <div className="flex items-center w-1/3">
          <img
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer dark:invert"
            alt="Search"
          />
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center w-1/3">
          <Link to="/">
            <img src={assets.baeyondnail} className="w-36" alt="Logo" />
          </Link>
        </div>

        {/* Right Side: Profile & Cart Icons */}
        <div className="flex items-center justify-end w-1/3 gap-6">
          <div className="relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer dark:invert"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className="absolute right-0 hidden group-hover:block pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded">
                  <p className="cursor-pointer hover:text-black dark:hover:text-white">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black dark:hover:text-white"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black dark:hover:text-white"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 dark:invert"
              alt="Cart"
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white dark:bg-white dark:text-black aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
      </div>

      {/* Navigation Menu Centered Below Logo */}
      <nav className="mt-2">
        <ul className="flex justify-center gap-8 text-sm text-gray-700 dark:text-gray-300">
          {["/", "/collection", "/about", "/contact"].map((path, index) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 pb-1 transition-all duration-200 ${
                    isActive ? "border-b-2 border-black dark:border-white" : ""
                  }`
                }
              >
                <p>{labels[index]}</p>
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
