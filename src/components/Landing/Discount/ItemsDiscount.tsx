"use client";
import React from "react";

import imageHouses from "@/assets/rent/imageHouses.png";

import { House } from "../../../types/RentTypes/HomeTypes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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
  springLeftToRight,
} from "../../../utils/animation/variants";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import CardOfDiscount from "./CardOfDiscount";
import Slider from "react-slick";
import { Button } from "@heroui/button";
interface IItemsDiscountProps {
  filterDiscount: House[];
}
const settings = {
  dots: true,
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
        <div className=" w-[320px] mx-auto">
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className=" w-[320px] mx-auto "
          >
            {" "}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              spaceBetween={50}
              breakpoints={{
                540: { slidesPerView: 1.5, spaceBetween: 5 },
                640: { slidesPerView: 1.7, spaceBetween: 5 },
                768: { slidesPerView: 2.1, spaceBetween: 5 },
                1024: { slidesPerView: 2.7, spaceBetween: 20 },
                1280: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 3 },
                1400: { slidesPerView: 3.5, spaceBetween: 50 },
                1536: { slidesPerView: 4, spaceBetween: 20 },
                1600: { slidesPerView: 5, spaceBetween: 200 },
              }}
              className="h-[600px]"
            >
              {filterDiscount &&
                filterDiscount.slice(0, 4).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={item.id}
                      className=" p-2 transform-gpu flex flex-col shadow-md gap-[20px] hover:shadow-2xl  rounded-[24px]"
                    >
                      <CardOfDiscount item={item} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>{" "}
          </motion.div>{" "}
          <motion.div
            variants={springLeftToRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="    "
          >
            <Button className="w-full h-[48px] rounded-xl bg-[#7575FE] text-[white] ">
              مشاهده همه
            </Button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex flex-row gap-4 pt-[36px] flex-wrap "
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
