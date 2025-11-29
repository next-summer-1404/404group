import React from "react";
import TopSellerNotification from "./TopSellerNotification";
import MainSellerNotification from "./MainSellerNotification";

const SellerNotification = () => {
  return (
    <div
      className="
    bg-white dark:bg-gray-900 
    rounded-2xl 
    px-2 md:px-4 lg:px-6 
    py-3 
    w-full
    transition-colors duration-300
  "
    >
      <TopSellerNotification />
      <MainSellerNotification />
    </div>
  );
};

export default SellerNotification;
