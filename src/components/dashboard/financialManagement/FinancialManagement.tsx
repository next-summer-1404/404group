import React, { FC } from "react";
import HeroFainance from "./HeroFainance";
import ContainFainance from "./ContainFainance";
import { FinanceTypes } from "@/types/panel/FinanceTypes";

interface SellerDashboardProps {
  Finance: FinanceTypes;
}

const FinancialManagement: FC<SellerDashboardProps> = ({ Finance }) => {
  return (
    <div>
      <HeroFainance Finance={Finance} />
      <ContainFainance />
    </div>
  );
};

export default FinancialManagement;
