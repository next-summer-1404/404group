"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // بررسی وضعیت ذخیره‌شده در localStorage
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      isIconOnly
      onClick={toggleTheme}
      aria-label="تغییر تم"
      variant="flat"
      className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
    >
      {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  );
}
