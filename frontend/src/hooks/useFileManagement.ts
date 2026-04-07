// src/hooks/useFileManagement.ts
import { useState, useCallback } from "react";
import { FileWithPreview } from "@/types"; // Adjust path as needed

export function useFileManagement() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    const updatedFiles = newFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file) // Create object URL for preview
      })
    );
    setFiles(prev => [...prev, ...updatedFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles[index];
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview); // Clean up object URL
      }
      return prevFiles.filter((_, i) => i !== index);
    });
  }, []);

  const openFilePreview = useCallback((file: FileWithPreview) => {
    setPreviewFile(file);
  }, []);

  const closeFilePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);

  // Calculate total size and format it for display
  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const formattedSize = totalSize > 0
    ? totalSize < 1024 * 1024
      ? `${(totalSize / 1024).toFixed(1)} KB`
      : `${(totalSize / (1024 * 1024)).toFixed(1)} MB`
    : "0 KB";

  return {
    files,
    addFiles,
    removeFile,
    previewFile,
    openFilePreview,
    closeFilePreview,
    formattedSize,
    setFiles, // Exposed for external reset (e.g., after successful upload)
  };
}