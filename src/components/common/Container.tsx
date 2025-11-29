import React from "react";

function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-[1440px] mx-auto p-[16px] ">{children}</div>;
}

export default Container;
