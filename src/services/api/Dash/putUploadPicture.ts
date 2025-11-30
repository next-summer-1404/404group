import http from "@/services/api/interceptor/interceptor";
import {
  UploadProfilePictureRequest,
  UploadProfilePictureResponse,
} from "@/types/panel/TypePicture";

export const putUploadPicture = async (value: UploadProfilePictureRequest) => {
  const formData = new FormData();
  formData.append("picture", value.picture);

  const res = await http.put<UploadProfilePictureResponse>(
    "/api/users/upload/picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
};
