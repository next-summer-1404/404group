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
function TextBoxComment() {
  return (
    <div className="w-[1328px] mx-auto flex flex-col gap-4 ">
      <motion.div
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] sm:mr-0 border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center"
      >
        نظرات کاربران
      </motion.div>
      <motion.h1
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] sm:mr-0 font-[700] text-[32px] text-[#000000] w-[219px] h-[84px] dark:text-white  "
      >
        نظرات کاربران درباره آلفا
      </motion.h1>
      <motion.p
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className=" font-[500] text-[16px] text-[#555555] w-[372px] h-[56px] dark:text-gray-300 mt-[16px]"
      >
        تیم دلتا با ارائه بهترین نیرو های خدماتی و سرویس های املاکی سعی دارد تا
        بتواند در تمام لحظات کنار شما باشد.
      </motion.p>
    </div>
  );
}

export default TextBoxComment;
