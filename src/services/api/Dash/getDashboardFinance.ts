import { FinanceTypes } from "@/types/panel/FinanceTypes";
import http from "@/services/api/interceptor/interceptor";

export const getDashboardFinance = async (): Promise<FinanceTypes> => {
  const res = await http.get<FinanceTypes>(
    "https://delta-project.liara.run/seller/finance/dashboard"
  );
  // console.log(res ,'rrrrrrrrrrr')
  return res.data;
};
