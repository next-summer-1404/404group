import React from "react";
import ImageInfo from "./ImageInfo";
import User from "./User";
import SecurityInfo from "./SecurityInfo";

const UseInformation = () => {
  return (
    <div
      className="
    h-auto 
    bg-white dark:bg-gray-900 
    rounded-2xl 
    flex flex-col 
    gap-6
    p-4 md:p-6
    transition-colors duration-300
    shadow-md dark:shadow-none
  "
    >
      <ImageInfo />
      <User />
      <SecurityInfo />
    </div>
  );
};

export default UseInformation;
