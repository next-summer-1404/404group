import { getAllCategory } from "../../../services/api/Admin/category/getAllCategory";
import SliderForCategorys from "./SliderForCategorys";
import TextBoxCategory from "./TextBoxCategory";

async function CategorysComponenetInLandingPage() {
  const data = await getAllCategory({ page: 1, limit: 200 });

  return (
    <>
      {" "}
      <div className="hidden sm:block w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute -right-10 top-[135%]"></div>{" "}
      <div className="mx-auto max-w-[1328px]  mt-[72px] flex sm:flex-row-reverse">
        <div className="w-[400px] sm:w-[1124px] flex flex-col gap-[16px] mx-auto sm:mx-0">
          <TextBoxCategory />
          <div className="pt-[40px]">
            <SliderForCategorys value={data?.data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorysComponenetInLandingPage;
