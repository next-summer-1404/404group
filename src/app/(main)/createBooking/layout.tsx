import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-[48px] dark:bg-gray-900">{children}</div>;
}

export default layout;
