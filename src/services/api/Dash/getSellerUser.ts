import http from "@/services/api/interceptor/interceptor";
import { GetSellerHousesResponse } from "@/types/panel/SellerUserType";

export const getSellerUser = async (): Promise<GetSellerHousesResponse> => {
  const response = await http.get<GetSellerHousesResponse>(
    "/api/houses/seller/user"
  );
  return response;
};
