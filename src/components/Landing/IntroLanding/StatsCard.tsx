"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { springBottomtoUp } from "../../../utils/animation/variants";

interface IStatsCardProps {
  value: string;
  height: string;
  color: string;
  darkColor: string;
  description: string;
  index?: number;
}
const statsAnimation: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: (delayIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 120, // قدرت فنر
      damping: 8, // میزان کاهش نوسان
      mass: 2,
      delay: delayIndex * 0.2, // هر کارت ۰.۲ ثانیه بعدی بیاید
    },
  }),
};
function StatsCard({
  value,
  height,
  color,
  darkColor,
  description,
  index,
}: IStatsCardProps) {
  return (
    <motion.div
      variants={statsAnimation}
      initial="hidden"
      animate="visible"
      custom={index}
      className={`
          rounded-[32px] sm:w-[199px] w-full  ${height}
          flex flex-col gap-[8px] pt-[12px] pb-[16px] pr-[20px] pl-[14px]
           ${darkColor} ${color}
        `}
    >
      <h2 className="font-[700] text-[15px] text-[#1E1E1E] dark:text-white">
        بیش از
      </h2>

      <div className="font-[700] text-[40px] text-[#1E1E1E] dark:text-white">
        {value}+
      </div>

      <p className="font-[600] text-[14px] text-[#1E1E1E] dark:text-gray-200">
        {description}
      </p>
    </motion.div>
  );
}

export default StatsCard;
