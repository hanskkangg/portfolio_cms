import React from "react";



// title component that displays heading
const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 dark:text-yellow-400">
        {" "}
        {text1}
        <span className="text-gray-700 font-medium dark:text-white">
          {" "}
          {text2}{" "}
        </span>{" "}
      </p>
      
      {/* Decorative line next to the heading */}
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 dark:text-white"></p>
    </div>
  );
};

export default Title;
