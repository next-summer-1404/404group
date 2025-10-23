import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-[48px]">{children}</div>;
}

export default layout;
