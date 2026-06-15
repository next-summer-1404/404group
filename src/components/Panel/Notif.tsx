import React from "react";
import TopNotifiction from "./NotifTop";
import MainNotifiction from "./NotifMain";

const Notifiction = () => {
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
      <TopNotifiction />
      <MainNotifiction />
    </div>
  );
};

export default Notifiction;
