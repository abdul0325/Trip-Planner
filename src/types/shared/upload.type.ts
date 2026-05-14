export type PresignUploadReq = {
  folder: "user-avatar" | "user-cover-image" | "business-cover" | "business-profile";
  contentType: string;
  extension: string;
};

export type PresignUploadRes = {
  uploadUrl: string;
  fileKey: string;
};

export type UpdateAvatarReq = {
  fileKey: string;
};
