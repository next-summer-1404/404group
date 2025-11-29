"use client";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="
    mx-12 
    h-max py-12 
    rounded-3xl 
    bg-gray-100 dark:bg-gray-800 
    mt-20 
    flex flex-col md:flex-row 
    gap-10 md:gap-0 
    justify-between
  "
    >
      {/* ستون ۱ */}
      <div className="md:w-1/4 w-full px-3 pt-4 pb-12">
        <div className="font-extrabold text-4xl tracking-widest dark:text-white">
          AIFA
        </div>
        <p className="leading-relaxed break-words whitespace-normal mt-6 px-1 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
        </p>
      </div>

      {/* ستون ۲ */}
      <div className="md:w-1/4 w-full">
        <ul className="text-black dark:text-white tracking-wider px-3 pt-4 pb-12">
          <p className="font-semibold mb-4">نحوه رزرو اقامتگاه</p>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            راهنمای رزرو اقامتگاه
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            شیوه پرداخت
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            لغو رزرو اقامتگاه
          </li>
        </ul>
      </div>

      {/* ستون ۳ */}
      <div className="md:w-1/4 w-full">
        <ul className="text-black dark:text-white tracking-wider px-3 pt-4 pb-12">
          <p className="font-semibold mb-4">خدمات مشتریان</p>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            پرسش های متداول مهمان
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            پرسش های متداول میزبان
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            چطور اقامتگاه ثبت کنیم؟
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            حریم شخصی کاربران
          </li>
        </ul>
      </div>

      {/* ستون ۴ */}
      <div className="md:w-1/4 w-full">
        <ul className="text-black dark:text-white tracking-wider px-3 pt-4 pb-12">
          <p className="font-semibold mb-4">راه‌های ارتباطی دلتا</p>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            ۰۹۲۲۲۳۸۲۳۹۳ , ۰۹۱۲۳۹۲۸۷۴۶
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            delta@gmail.com
          </li>
          <li className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            گیلان , رشت , میدان آزادی , جنب چهار راه عظیم زاده
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
