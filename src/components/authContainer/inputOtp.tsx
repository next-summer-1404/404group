"use client";
import React, { useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  setVerifyCode: (code: string) => void;
}

const OTPInput = ({ length = 6, setVerifyCode }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  const persianToEnglishNumber = (str: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(
      /[۰-۹]/g,
      (char) => englishDigits[persianDigits.indexOf(char)]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value.replace(/[^\d۰-۹]/g, ""); // فقط اعداد
    const persianDigit = toPersianNumber(value);

    const newOtp = [...otp];
    newOtp[i] = persianDigit;
    setOtp(newOtp);
    setVerifyCode(persianToEnglishNumber(newOtp.join("")));
    if (value && i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 relative right-0" style={{ direction: "ltr" }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          className="w-12 h-12 sm:w-16 sm:h-16 text-center text-[24px] rounded-xl sm:rounded-[24px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#7575FE] focus:scale-110 transition-all focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;
