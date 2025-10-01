"use client";
import { Button } from "@heroui/button";
import React, { useEffect, useState } from "react";
import time from "@/assets/auth/time.png";

function TimerButton() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsCounting(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isCounting]);

  const handleResend = () => {
    setTimeLeft(120);
    setIsCounting(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  return (
    <div className="text-center mt-6  flex justify-between ">
      <Button
        disabled={isCounting}
        onClick={handleResend}
        className="bg-[#7575FE30] rounded-[31px] py-2 px-4   text-[#7575FE]"
      >
        {isCounting ? (
          <p className="  flex flex-row gap-2 text-[#7575FE]">
            <span
              style={{ backgroundImage: `url(${time.src})` }}
              className="size-[24px]  "
            ></span>
            {formatTime(timeLeft)}
          </p>
        ) : (
          <div>ارسال مجدد کد</div>
        )}
      </Button>
      <p className="text-[14px] text-[#767676]  py-2">
        بعد از اتمام 2 دقیقه ارسال مجدد فعال میشود
      </p>
    </div>
  );
}

export default TimerButton;
