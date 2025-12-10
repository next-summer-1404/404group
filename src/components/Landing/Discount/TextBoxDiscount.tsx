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
function TextBoxDiscount() {
  return (
    <>
      <motion.div
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] sm:mr-0 border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center"
      >
        تخفیفات
      </motion.div>
      <motion.h1
        variants={springRightToLeftAndFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mr-[30px] sm:mr-0 font-[700] text-[32px] text-[#000000] w-[219px] h-[84px] dark:text-white  "
      >
        تخفیفات ویژه برای شروع بهار
      </motion.h1>
      <div className=" flex justify-between">
        <div className="">
          {/* <div>245:25:56</div>
          <p>فرصت رو از دست نده</p> */}
        </div>
        <motion.div
          variants={springLeftToRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden sm:block ml-[30px] sm:ml-0"
        >
          <Button className=" h-[48px] rounded-[100px] bg-[#7575FE] text-[white]">
            مشاهده همه
          </Button>
        </motion.div>
      </div>
    </>
  );
}

export default TextBoxDiscount;
