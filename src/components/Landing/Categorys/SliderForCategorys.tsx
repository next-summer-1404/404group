"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const NextArrow = dynamic(
  () => import("@/components/Landing/Categorys/arrowSlider/NextArrowProps"),
  { ssr: false }
);
const PrevArrow = dynamic(
  () => import("@/components/Landing/Categorys/arrowSlider/PrevArrowProps"),
  { ssr: false }
);
import apartmani from "@/assets/landing/apartman.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
} from "../../../utils/animation/variants";
import { statsAnimation } from "../IntroLanding/StatsCard";
interface ICategoryTypes {
  id: string;
  name: string;
}
interface SliderForCategorysProps {
  value: ICategoryTypes[];
}
function SliderForCategorys({ value }: SliderForCategorysProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {" "}
      <Slider {...settings}>
        {value?.map((item, index) => (
          <div key={item.id}>
            <div className=" w-[344px] h-[345px] rounded-[32px] relative overflow-hidden">
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
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default SliderForCategorys;
