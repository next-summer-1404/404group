"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeInRight } from "../../../utils/animation/variants";
import Image from "next/image";
import apartmani from "@/assets/landing/apartman.png";
import { ICommentItem } from "../../../types/adminPanel/commentAdminTypes";

// Swiper — MUST be dynamic to avoid hydration flickering
const Swiper = dynamic(() => import("swiper/react").then((m) => m.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((m) => m.SwiperSlide),
  { ssr: false }
);

// Modules
import { Navigation, Pagination } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CenterSlider from "./CenterSlider";

interface ISliderProps {
  data: ICommentItem[];
}

export default function SliderForComment({ data }: ISliderProps) {
  return (
    <>
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-[40px]"
      ></motion.div>
    </>
  );
}
