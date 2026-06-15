"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
function SetRefreshToken() {
  console.log("set token:", Cookies.get("accessTokenClient"));

  const fetchData = async () => {
    const res = await axios.get("/api/auth/refreshToken");
    console.log(res.data.decoded);

    const newAccessToken = res.data.decoded;
    if (newAccessToken) {
      Cookies.set("accessTokenClient", newAccessToken, {
        httpOnly: false,
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    }
  };
  useEffect(() => {
    const token = Cookies.get("accessTokenClient");
    if (token) {
      const decoded: any = jwt.decode(token);
      console.log("Decoded Token in Landing:", decoded.exp);

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        console.log("Token expired!");
        fetchData();
      } else {
        console.log("Token is valid");
      }
    } else {
      console.log("No token found");
    }
  }, []);
  return <div></div>;
}

export default SetRefreshToken;
