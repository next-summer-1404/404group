"use client";
import React from "react";
import { AreaItem } from "../../../types/adminPanel/loc";
const NextArrow = dynamic(
  () => import("@/components/Landing/Categorys/arrowSlider/NextArrowProps"),
  { ssr: false }
);
const PrevArrow = dynamic(
  () => import("@/components/Landing/Categorys/arrowSlider/PrevArrowProps"),
  { ssr: false }
);
import { motion } from "framer-motion";
import { fadeInRight } from "../../../utils/animation/variants";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import apartmani from "@/assets/landing/apartman.png";
interface ISliderProps {
  data: AreaItem[];
}
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768, // کمتر از 768px
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};
function SliderByDestinationList({ data }: ISliderProps) {
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-[40px]"
    >
      {" "}
      <Slider {...settings}>
        {data?.map((item, index) => (
          <div key={item.id}>
            <div className=" w-[344px] h-[345px] rounded-[32px] relative overflow-hidden z-50">
              {/* عکس */}
              <Image
                src={apartmani}
                alt="apartman"
                fill
                className="object-cover rounded-[32px] z-0"
              />

              {/* گرادیانت روی عکس */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#9E9E9E00]  to-[#00000091] z-10 flex flex-col justify-end p-[16px]">
                <div></div>
                <div className="text-[white] text-[24px] font-[600] text-right">
                  {item.area_name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default SliderByDestinationList;
