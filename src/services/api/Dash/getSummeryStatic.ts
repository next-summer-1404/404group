import { DashboardSummary } from "@/types/panel/DashboardSummary";
import http from "@/services/api/interceptor/interceptor";

export const getSummeryStatic = async (): Promise<DashboardSummary> => {
  const response = await http.get<DashboardSummary>("/api/dashboard/summary");
  return response;
};
