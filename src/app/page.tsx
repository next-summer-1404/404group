import * as React from "react";
import { Button } from "@heroui/button";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    const decoded = jwt.decode(accessToken);
    console.log("Decoded Token in Landing:", decoded); // این لاگ توی سرور زده میشه
  } else {
    console.log("dont have token:"); // این لاگ توی سرور زده میشه
  }

  return <Button color="primary">Press me</Button>;
}
