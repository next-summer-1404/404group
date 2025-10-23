"use client";

import { useEffect } from "react";

export function useTheme() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = stored || (prefersDark ? "dark" : "light");

    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);
}

export function setTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  localStorage.setItem("theme", theme);
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}
