import React from "react";
import Container from "../common/Container";
import authBg from "@/assets/auth/authBg.jpg";
import authComma from "@/assets/auth/FrameAuth.png";
import right from "@/assets/auth/rightArrow.png";
import left from "@/assets/auth/leftArrow.png";

function AuthSideBanner() {
  return (
    <Container>
      <div
        className="rounded-[32px] bg-no-repeat  w-[704px] h-[720px] hidden  lg:block"
        style={{ backgroundImage: `url(${authBg.src})` }}
      >
        {" "}
        <div className="bg-[rgba(0,0,0,0.3)] w-[704px] h-[720px] rounded-[32px]   bg-cover bg-center flex flex-col-reverse justify-between ">
          {" "}
          <div className=" h-[60%] border-white p-[32px] flex flex-col gap-4">
            <div
              className=" rounded-full size-[40px] bg-[#F9F9F963] bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${authComma.src})` }}
            ></div>
            <div className="text-white text-[20px] leading-[30px] mb-5">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className=" flex justify-between">
              {" "}
              <div>
                {" "}
                <div></div>
                <div>
                  <h1></h1>
                  <p></p>
                </div>
              </div>
              <div className=" flex gap-[16px]">
                <div
                  className="bg-[#F9F9F963] size-[56px] rounded-[28px] bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${right.src})` }}
                ></div>
                <div
                  className="bg-[#F9F9F963] size-[56px] rounded-[28px] bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${left.src})` }}
                ></div>
                <div></div>
              </div>
            </div>
          </div>
          <h1 className=" text-[32px] font-[700] relative -right-10">
            <span className="text-white">AL</span>
            <span className="text-black">FA</span>
          </h1>
        </div>
      </div>
    </Container>
  );
}

export default AuthSideBanner;
