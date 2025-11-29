import http from "@/services/api/interceptor/interceptor";
import { FavoriteTypes } from "@/types/panel/FavoritType";

export const getFavorite = async (): Promise<FavoriteTypes> => {
  const response = await http.get<FavoriteTypes>(
    "https://delta-project.liara.run/favorites/user"
  );
  return response;
};
