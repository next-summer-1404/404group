"use client";
import React from "react";
import {
  scale,
  scaleDesc,
  springRightToLeftAndFade,
} from "../../../utils/animation/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import rec from "@/assets/rent/Rectangle.svg";
function DescriptionInLanding() {
  return (
    <div className=" w-[400px] sm:w-[1328px] mx-auto mt-[108px] flex flex-row justify-between flex-wrap">
      <div className="flex flex-col gap-4">
        {" "}
        <motion.div
          variants={springRightToLeftAndFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className=" border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center"
        >
          آلفا درخشان{" "}
        </motion.div>
        <motion.h1
          variants={springRightToLeftAndFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className=" font-[700] text-[32px] text-[#000000]   dark:text-white  flex flex-row"
        >
          <span className="relative   size-[80px]">
            {" "}
            <Image src={rec} alt="R" fill className="object-cover" />{" "}
          </span>
          <span className="mt-3"> سال سابقه درخشان</span>
        </motion.h1>
        <motion.p
          variants={springRightToLeftAndFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className=" font-[400] text-[16px] text-[#000000] w-full sm:w-[564px]  leading-[25px] dark:text-gray-300 mt-[16px]"
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </motion.p>
      </div>
      <motion.div
        variants={scaleDesc}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative  sm:size-[528px] size-[300px] mx-auto sm:mx-0 "
      >
        {" "}
        <div className=" border border-transparent  w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute left-30 bottom-40"></div>{" "}
        <div className=" border border-transparent  w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute right-30 top-40"></div>{" "}
        <Image src={rec} alt="10" fill className="object-cover" />
      </motion.div>
    </div>
  );
}

export default DescriptionInLanding;
