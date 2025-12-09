"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  springRightToLeft,
  springRightToLeftAndFade,
} from "../../../utils/animation/variants";
function TextBoxCategory() {
  return (
    <>
      <motion.div
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center"
      >
        دسته بندی
      </motion.div>
      <motion.h1
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] font-[700] text-[32px] text-[#000000] w-[219px] h-[84px] dark:text-white"
      >
        هر ملکی بخوای اینجا پیدا میشه!
      </motion.h1>
      <motion.p
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] font-[500] text-[16px] text-[#555555] w-[372px] h-[56px] dark:text-gray-300"
      >
        با کلیک به روی هر دسته بندی می توانید تمام آگهی مربوط آن را مشاهده کنید
        و به ملک مورد علاقه خود برسید
      </motion.p>
    </>
  );
}

export default TextBoxCategory;
