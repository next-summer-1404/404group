// hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: "seller" | "buyer";
  id: string;
  avatar?: string;
  exp: number;
}

export const useUser = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessTokenClient");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        setUser(null);
      }
    }
  }, []);

  return user;
};
