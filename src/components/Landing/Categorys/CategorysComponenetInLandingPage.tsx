import { getAllCategory } from "../../../services/api/Admin/category/getAllCategory";
import SliderForCategorys from "./SliderForCategorys";

async function CategorysComponenetInLandingPage() {
  const data = await getAllCategory({ page: 1, limit: 200 });

  return (
    <>
      {" "}
      <div className="hidden sm:block w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute -right-10 top-[135%]"></div>{" "}
      <div className="mx-auto max-w-[1328px]  mt-[72px] flex sm:flex-row-reverse">
        <div className="w-[400px] sm:w-[1124px] flex flex-col gap-[16px] mx-auto sm:mx-0">
          <div className="mr-[30px] border text-[16px] font-[600] w-[123px] h-[52px] border-[#7575FE] text-[#7575FE] rounded-[100px] flex justify-center items-center">
            دسته بندی
          </div>
          <h1 className="mr-[30px] font-[700] text-[32px] text-[#000000] w-[219px] h-[84px] dark:text-white">
            هر ملکی بخوای اینجا پیدا میشه!
          </h1>
          <p className="mr-[30px] font-[500] text-[16px] text-[#555555] w-[372px] h-[56px] dark:text-gray-300">
            با کلیک به روی هر دسته بندی می توانید تمام آگهی مربوط آن را مشاهده
            کنید و به ملک مورد علاقه خود برسید
          </p>
          <div className="pt-[40px]">
            <SliderForCategorys value={data?.data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorysComponenetInLandingPage;
