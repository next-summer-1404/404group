"use client";
import Image from "next/image";
import React from "react";
import IntroImage from "@/assets/landing/landing.png";
import StatsCard from "./StatsCard";
import { motion } from "framer-motion";
import {
  fadeInDown,
  fadeInLeft,
  fadeInUp,
  itemVariants,
  scale,
  springRightToLeft,
} from "../../../utils/animation/variants";
import fastSearch from "@/assets/landing/fastSearchIcone.svg";
function IntroSectionLanding() {
  return (
    <motion.section className="mx-auto max-w-[1328px] grid grid-cols-1 lg:grid-cols-2 gap-10 mt-[80px] px-4 ">
      {/* Image Section */}
      <motion.div
        className="w-full h-[400px] lg:h-[630px] relative"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={IntroImage}
          alt="imageIntro"
          fill
          className="rounded-[32px] object-cover"
        />
      </motion.div>
      <motion.div
        variants={scale}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.25,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 10,
            duration: 0.25,
          },
        }}
        className="absolute border-[4px] size-[106px] sm:top-[40%] top-[48%] cursor-pointer 
         sm:right-[45.5%] right-[35%] rounded-full border-[white] bg-[#7575FE] p-[2px]"
      >
        <div className=" size-[32px] mx-auto mt-[12px] relative">
          {" "}
          <Image
            src={fastSearch}
            alt="fastSearch"
            fill
            className="object-cover"
          />
        </div>
        <p className=" mx-auto  text-white font-[600] text-[14px] w-[44px] ">
          جستجو
        </p>{" "}
        <p className=" mr-[28px]   text-white font-[600] text-[14px] w-[44px] h-[36px] ">
          سریع
        </p>
      </motion.div>
      {/* Text & Stats */}
      <div className="w-full flex flex-col justify-between pr-0 lg:pr-[32px] pt-[24px]">
        <motion.header
          className="flex flex-col"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-[700] text-[32px] lg:text-[40px] text-black dark:text-white max-w-[350px]">
            خانه‌ای که می‌خوای، جایی که می‌خوای
          </h1>

          <p className="font-[500] text-[14px] lg:text-[16px] text-[#767676] dark:text-gray-300 max-w-[385px] mt-[24px]">
            رزور ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن
            فقط در دلتا
          </p>
        </motion.header>

        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-[23px] items-end mt-10 lg:mt-0">
          <StatsCard
            index={1}
            value="7000"
            height="sm:h-[209px]"
            color="bg-[#F0F0F0]"
            darkColor="dark:bg-gray-800"
            description="رضایت مشتریانی که به آلفا اعتماد کرده اند"
          />

          <StatsCard
            index={2}
            value="8500"
            height="sm:h-[287px]"
            color="bg-[#DFDFFF]"
            darkColor="dark:bg-indigo-300"
            description="منطقه برای رزرو، ویلا و کلبه"
          />

          <StatsCard
            index={3}
            value="9000"
            height="sm:h-[360px]"
            color="bg-[#F0F0F0]"
            darkColor="dark:bg-gray-800"
            description="ملک برای رزرو و رهن و اجاره"
          />
        </div>
      </div>
    </motion.section>
  );
}

export default IntroSectionLanding;
