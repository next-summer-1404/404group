"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

/**
 * Hook برای چک کردن دارک مود
 */
export function useIsDark() {
  const { theme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // همیشه resolvedTheme آخرین theme واقعی را می‌دهد
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);
  useEffect(() => {
    // همیشه resolvedTheme آخرین theme واقعی را می‌دهد
    console.log(isDark);
  }, [isDark]);

  return isDark;
}
