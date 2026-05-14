import { api } from "@/config/axios.config";
import { toast } from "sonner";

/**
 * Response from image upload endpoint
 */
export type ImageUploadResponse = {
  url: string;
  id?: string;
  filename?: string;
  size?: number;
};

/**
 * Upload an image file to the server
 * @param file - The image file to upload
 * @returns The URL of the uploaded image
 * @throws Error if upload fails or file is invalid
 */
export const ImageUploadService = {
  uploadImage: async (file: File): Promise<string> => {
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only PNG and JPG images are allowed");
    }

    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to server
      const response = await api.post<ImageUploadResponse>("/upload", formData);

      if (!response.data.url) {
        throw new Error("No URL returned from server");
      }

      return response.data.url;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload image";
      toast.error(errorMessage);
      throw error;
    }
  },

  /**
   * Upload multiple images
   * @param files - Array of image files to upload
   * @returns Array of uploaded image URLs
   */
  uploadImages: async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map((file) =>
      ImageUploadService.uploadImage(file)
    );
    return Promise.all(uploadPromises);
  },
};
