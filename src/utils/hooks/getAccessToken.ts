"use client";

import { useEffect, useState } from "react";

export function useAccessToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessTokenClient="));

    if (cookie) {
      const value = cookie.split("=")[1];
      setToken(value);
    }
  }, []);

  return token;
}
