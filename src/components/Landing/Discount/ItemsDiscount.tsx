"use client";
import React from "react";
import Image from "next/image";
import googleIcone from "@/assets/auth/googleIcone.png";
import location from "@/assets/rent/location.png";
import parking from "@/assets/rent/parking.png";
import bathRome from "@/assets/rent/bathRome.png";
import bed from "@/assets/rent/bed.png";
import rating from "@/assets/rent/rating.png";
import imageHouses from "@/assets/rent/imageHouses.png";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../../utils/hooks/formatNumberToPersian";
import Link from "next/link";
import { House } from "../../../types/RentTypes/HomeTypes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const getFirstPhoto = (photos: string[] | null) => {
  if (photos && photos.length > 0 && photos[0] !== "") return photos[0];
  return imageHouses;
};
import { motion, Variants } from "framer-motion";
import {
  fadeInDown,
  fadeInRight,
  fadeInUp,
  springBottomtoUp,
  springBottomtoUpDelay,
} from "../../../utils/animation/variants";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import CardOfDiscount from "./CardOfDiscount";
import Slider from "react-slick";
interface IItemsDiscountProps {
  filterDiscount: House[];
}
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  rtl: true, // فقط RTL برای موبایل
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rtl: true,
      },
    },
  ],
};
function ItemsDiscount({ filterDiscount }: IItemsDiscountProps) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="border w-[303px] mx-auto"
        >
          <Slider {...settings}>
            {filterDiscount.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                className=" p-2 transform-gpu flex flex-col shadow-md gap-[20px] hover:shadow-2xl  rounded-[24px]"
              >
                <CardOfDiscount item={item} />
              </div>
            ))}
          </Slider>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-row gap-4 pt-[36px]  flex-wrap "
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filterDiscount.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={springBottomtoUpDelay}
              whileHover={{
                y: -12, // انیمیشن هاور
                transition: { type: "spring", stiffness: 150, mass: 1 },
              }}
              className=" p-2 transform-gpu flex flex-col shadow-md gap-[20px] hover:shadow-2xl dark:hover:shadow-[0px_10px_20px_2px_white] dark:shadow-black rounded-[24px]"
            >
              <CardOfDiscount item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default ItemsDiscount;
