import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      
      {/* Page title with top border */}
      <div className="text-2xl text-center py-7 border-t  dark:text-gray-200 dark:border-y">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>


      {/* Contact info section: image and text */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-3xl"
          src={assets.banana_sale}
          alt=""
        />
        
        {/* Address and contact details */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-xl text-gray-600 dark:text-gray-200">
            Location
          </p>
          <p className=" text-gray-500 dark:text-gray-400">
            2430 Bank Street <br /> Suite 20, Ottawa, Ontario
          </p>
          <p className=" text-gray-500 dark:text-gray-400">
            Tel: (613) 888-888 <br /> Email: Hans.Kkang@gmail.com
          </p>
        </div>
      </div>

      {/* Newsletter subscription form  removed */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Contact;
