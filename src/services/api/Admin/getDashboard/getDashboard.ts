import http from "@/services/api/interceptor/interceptor";
import { IAdminDashboard } from "../../../../components/adminPanelContainer/AdminDashboard";

export const getDashboard = async (): Promise<IAdminDashboard> => {
  const res: IAdminDashboard = await http.get("/api/admin/dashboard");
  return res as IAdminDashboard; 
};
