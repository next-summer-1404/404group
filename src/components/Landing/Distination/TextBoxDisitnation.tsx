"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  springLeftToRight,
  springRightToLeft,
  springRightToLeftAndFade,
} from "../../../utils/animation/variants";
import { Button } from "@heroui/button";
function TextBoxDisitnation() {
  return (
    <div className="flex flex-col gap-4 sm:mr-[40px]     p-4">
      <motion.div
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="sm:mr-[30px] mr-0 border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center"
      >
        مقصد رویا ها
      </motion.div>
      <motion.h1
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="sm:mr-[30px] mr-0 font-[700] text-[32px] text-[#000000]   dark:text-white  flex flex-col"
      >
        <span> اجاره ویلا در </span>
        <span>محبوب‌ترین مقاصد این ماه</span>
      </motion.h1>
      <motion.p
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className=" font-[500] text-[16px] text-[#555555] w-[372px] h-[56px] dark:text-gray-300 mt-[16px]"
      >
        در اینجا می توانید محبوب ترین مقصد هارا از بین انتخاب کاربران مشاهده
        کنید و آن ها بررسی کنید !
      </motion.p>{" "}
      <div className="hidden sm:block absolute  top-10 left-0 size-120 overflow-hidden">
        <div className="hidden sm:block  w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute left-0 top-[250px]"></div>{" "}
      </div>
    </div>
  );
}

export default TextBoxDisitnation;
