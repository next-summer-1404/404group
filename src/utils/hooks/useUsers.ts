// hooks/useUser.ts
"use client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [decodeState, setDecodeState] = useState("");
  const token = Cookies.get("accessTokenClient");
  useEffect(() => {
    if (token) {
      const decoded: any = jwt.decode(token);

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        console.log("Token expired!");
        setDecodeState("");
      } else {
        console.log("Token is valid");
        setDecodeState(decoded);
      }
    } else {
      console.log("No token found");
      return;
    }
  }, [token]);

  return decodeState;
};
