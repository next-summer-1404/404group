import { Variants } from "framer-motion";

// item variants برای المان‌های مستقل
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// می‌توانید variants دیگر هم اضافه کنید، مثلا برای scale، rotate، fade
export const fadeInUp = {
  hidden: { opacity: 0, y: 140 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
export const fadeInLeft = {
  hidden: { opacity: 0, x: 140 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
export const fadeInRight = {
  hidden: { opacity: 0, x: -140 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
export const springRightToLeft: Variants = {
  hidden: { opacity: 0, x: 80 }, // از راست وارد شود
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 180, // قدرت فنر
      damping: 4, // میزان کاهش نوسان
      mass: 1, // وزن انیمیشن
      duration: 0.6,
    },
  },
};
export const springLeftToRight: Variants = {
  hidden: { opacity: 0, x: -50 }, // از راست وارد شود
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120, // قدرت فنر
      damping: 10, // میزان کاهش نوسان
      mass: 2, // وزن انیمیشن
      duration: 0.6,
    },
  },
};
export const springRightToLeftAndFade: Variants = {
  hidden: { opacity: 0, x: 80 }, // از راست وارد شود
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120, // قدرت فنر
      damping: 10, // میزان کاهش نوسان
      mass: 2, // وزن انیمیشن
      duration: 0.6,
    },
  },
};
export const springBottomtoUp: Variants = {
  hidden: { opacity: 0, y: 80 }, // از راست وارد شود
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180, // قدرت فنر
      damping: 4, // میزان کاهش نوسان
      mass: 1, // وزن انیمیشن
      duration: 0.6,
    },
  },
};
export const springBottomtoUpDelay: Variants = {
  hidden: { y: 180 },
  visible: (delayIndex: number) => ({
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 120, // قدرت فنر
      damping: 4, // میزان کاهش نوسان
      mass: 1,
      delay: delayIndex * 0.03, // هر کارت ۰.۲ ثانیه بعدی بیاید
    },
  }),
};
export const hoverCard = {
  rest: { scale: 1, x: 0 },
  hover: {
    scale: 1.08,
    x: -5,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};
export const scale: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130, // قدرت فنر
      damping: 10, // میزان کاهش نوسان
      mass: 1, // وزن انیمیشن
      duration: 0.6,
      delay: 0.7,
    },
  },
};
export const scaleHover: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 120, // قدرت فنر
      damping: 2, // میزان کاهش نوسان
      mass: 1, // وزن انیمیشن
      duration: 0.3,
    },
  },
};
export const scaleDesc: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130, // قدرت فنر
      damping: 10, // میزان کاهش نوسان
      mass: 1, // وزن انیمیشن
      duration: 0.6,
    },
  },
};
