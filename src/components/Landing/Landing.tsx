import { getHouse } from "@/services/api/HouseApiLand/Houses";
import Image from "next/image";
import SetRefreshToken from "../RefreshToken/SetRefreshToken";
import landing from "../../../public/landing.png";
import Link from "next/link";
import IntroSectionLanding from "./IntroLanding/IntroSectionLanding";
import CategorysComponenetInLandingPage from "./Categorys/CategorysComponenetInLandingPage";

const Landing = () => {
  return (
    <div className="w-full" dir="rtl">
      <SetRefreshToken />
      <IntroSectionLanding />
      <CategorysComponenetInLandingPage />
    </div>
  );
};

export default Landing;
