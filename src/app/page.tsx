import * as React from "react";
import { Button } from "@heroui/button";
import SetRefreshToken from "../components/RefreshToken/SetRefreshToken";
import Header from "../components/Header/Header";
import Landing from "../components/Landing/Landing";
import Footer from "../components/Footer/Footer";

export default async function Home() {
  return (
    
      
      <main className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen dark:bg-gray-900 bg-white font-yekan">
        <Header />
        <Landing />
        <Footer />
      </main>
 
  );
}
