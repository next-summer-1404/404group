export interface UploadProfilePictureRequest {
  picture: File;
}

export interface UploadProfilePictureResponse {
  message: string;
  path: string;
}
