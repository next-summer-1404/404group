"use client";

import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();

  const toggle = () => {
    // اگر کاربر روی سیستم باشد، وضعیت فعلی سیستم را معکوس کن
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Button
      isIconOnly
      onClick={toggle}
      className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white h-[48px] w-[48px]"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon size={20} />
      ) : (
        <MoonIcon size={20} />
      )}
    </Button>
  );
}
