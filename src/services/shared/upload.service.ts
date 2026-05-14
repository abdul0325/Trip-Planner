import axios from "axios";
import type { PresignUploadReq, PresignUploadRes } from "@/types/shared/upload.type";
import { clientApi } from "@/config/axios-client.config";

export const UploadService = {
  createPresignedUploadUrl: async (data: PresignUploadReq) => {
    const res = await clientApi.post<PresignUploadRes>("/upload/presign", data);
    return res.data;
  },

  uploadFileToPresignedUrl: async (args: {
    uploadUrl: string;
    file: File;
    contentType?: string;
    onProgress?: (progress: number) => void;
  }) => {
    await axios.put(args.uploadUrl, args.file, {
      headers: {
        "Content-Type": args.contentType || args.file.type || "application/octet-stream",
      },
      onUploadProgress: (progressEvent) => {
        if (!args.onProgress) return;
        const total = progressEvent.total || args.file.size;
        const loaded = progressEvent.loaded || 0;
        const percent = total ? Math.round((loaded / total) * 100) : 0;
        args.onProgress(percent);
      },
    });
  },
};
