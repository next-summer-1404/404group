import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {" "}
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
