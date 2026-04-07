// src/hooks/useFileUpload.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FileWithPreview } from "@/types"; // Adjust path as needed

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface UseFileUploadProps {
  files: FileWithPreview[];
  title: string;
  message: string;
  transferOption: "link";
  password?: string;
  onUploadSuccess: (link: string) => void;
  onUploadError: (error: unknown) => void;
  onResetForm: () => void; // Callback to reset main form state
}

export function useFileUpload({
  files,
  title,
  message,
  transferOption,
  password,
  onUploadSuccess,
  onUploadError,
  onResetForm,
}: UseFileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleTransfer = useCallback(async () => {
    if (files.length === 0) {
      toast.error("Please add at least one file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("message", message);
    formData.append("transferOption", transferOption);

    if (password) {
      formData.append("password", password);
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        },
      });

      const data = response.data;

      if (!data?.shortLinks) {
        throw new Error("No download link received from server.");
      }

      onUploadSuccess(data.shortLinks);
      onResetForm(); // Call to reset form in parent
    } catch (err) {
      console.error("Upload error:", err);
      onUploadError(err);
    } finally {
      setIsUploading(false);
    }
  }, [
    files,
    title,
    message,
    transferOption,
    password,
    onUploadSuccess,
    onUploadError,
    onResetForm
  ]);

  return { uploadProgress, isUploading, handleTransfer };
}