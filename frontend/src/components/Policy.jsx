import React from "react";
import { assets } from "../assets/assets";

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
      {/* Return Policy */}
      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-5 dark:invert"
          alt="Return Policy Icon"
        />
        <p className="font-semibold text-gray-800 dark:text-white">
          Return Policy
        </p>
        <p className="text-gray-400 dark:text-gray-400">
          Nokia today announced that it has acquired Rapid’s technology assets,
          including the world’s largest API marketplace, and its highly skilled
          team.
        </p>
      </div>

      {/* Exchange Policy */}
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5 dark:invert"
          alt="Exchange Policy Icon"
        />
        <p className="font-semibold text-gray-800 dark:text-white">
          Exchange Policy
        </p>
        <p className="text-gray-400 dark:text-gray-400">
          Nokia today announced that it has acquired Rapid’s technology assets,
          including the world’s largest API marketplace, and its highly skilled
          team.
        </p>
      </div>

      {/* Customer Support */}
      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-5 dark:invert"
          alt="Customer Support Icon"
        />
        <p className="font-semibold text-gray-800 dark:text-white">
          Customer Support
        </p>
        <p className="text-gray-400 dark:text-gray-400">
          Nokia today announced that it has acquired Rapid’s technology assets,
          including the world’s largest API marketplace, and its highly skilled
          team.
        </p>
      </div>
    </div>
  );
};

export default Policy;
