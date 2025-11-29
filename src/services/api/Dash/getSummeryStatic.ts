import { DashboardSummary } from "@/types/panel/DashboardSummary";
import http from "@/services/api/interceptor/interceptor";

export const getSummeryStatic = async (): Promise<DashboardSummary> => {
  const response = await http.get<DashboardSummary>(
    "https://delta-project.liara.run/dashboard/summary"
  );
  return response;
};
