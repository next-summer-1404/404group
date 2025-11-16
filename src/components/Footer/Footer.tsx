"use client";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="max mr-12 ml-12 h-max py-12 rounded-3xl bg-gray-100 dark:bg-gray-800 mt-20 flex"
    >
      <div className="max-w-1/4 mr-22 px-3 pt-4 pb-12">
        <div className="font-extrabold text-4xl tracking-widest">AIFA</div>
        <p className="leading-relaxed break-words whitespace-normal mt-6 px-1 text-gray-600 dark:text-gray-400">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
        </p>
      </div>
      <div>
        <ul className="text-black dark:text-white tracking-wider mr-22 mt-15 px-3 pt-4 pb-12">
          نحوه رزرو اقامتگاه
          <li className="text-sm text-gray-600 mt-5">راهنمای رزرو اقامتگاه</li>
          <li className="text-sm text-gray-600 mt-2">شیوه پرداخت</li>
          <li className="text-sm text-gray-600 mt-2">لغو رزرو اقامتگاه</li>
        </ul>
      </div>
      <div>
        {" "}
        <ul className="text-black dark:text-white tracking-wider mr-22 mt-15 px-3 pt-4 pb-12">
          خدمات مشتریان
          <li className="text-sm text-gray-600 mt-5">پرسش های متداول مهمان</li>
          <li className="text-sm text-gray-600 mt-2">پرسش های متداول میزبان</li>
          <li className="text-sm text-gray-600 mt-2">
            چطور اقامتگاه ثبت کنیم؟؟
          </li>
          <li className="text-sm text-gray-600 mt-2">حریم شخصی کاربران</li>
        </ul>
      </div>
      <div>
        {" "}
        <ul className="text-black dark:text-white tracking-wider mr-22 mt-15 px-3 pt-4 pb-12">
          راه های ارتیاطی دلتا
          <li className="text-sm text-gray-600 mt-5">
            ۰۹۲۲۲۳۸۲۳۹۳ , ۰۹۱۲۳۹۲۸۷۴۶
          </li>
          <li className="text-sm text-gray-600 mt-2">delta@gmail.com</li>
          <li className="text-sm text-gray-600 mt-2">
            گبلان , رشت , میدان آزادی , جنب چهار راه عظیم زاده
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
