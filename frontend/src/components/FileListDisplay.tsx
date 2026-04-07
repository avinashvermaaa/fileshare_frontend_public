// src/components/FileListDisplay.tsx
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Paperclip, Eye, X, Plus } from "lucide-react";
import { FileWithPreview } from "@/types"; // Adjust path as needed

interface FileListDisplayProps {
  files: FileWithPreview[];
  formattedSize: string;
  onAddMoreFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onOpenFilePreview: (file: FileWithPreview) => void;
}

export function FileListDisplay({
  files,
  formattedSize,
  onAddMoreFiles,
  onRemoveFile,
  onOpenFilePreview,
}: FileListDisplayProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseMore = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onAddMoreFiles(selectedFiles);
      e.target.value = ""; // Clear the input value
    }
  }, [onAddMoreFiles]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
          {files.length} {files.length === 1 ? 'file' : 'files'} · {formattedSize}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBrowseMore}
          className="text-fileshare-blue dark:text-blue-400"
        >
          <Plus size={16} className="mr-1" />
          Add more
        </Button>
      </div>

      <div className="max-h-40 overflow-y-auto space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded">
            <div className="flex items-center space-x-2 flex-1 truncate">
              <Paperclip size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />
              <span className="text-sm truncate max-w-[180px]">{file.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenFilePreview(file)}
                className="h-6 w-6 text-gray-500 hover:text-fileshare-blue dark:text-gray-400 dark:hover:text-blue-400"
                title="Preview file"
              >
                <Eye size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveFile(index)}
                className="h-6 w-6 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                title="Remove file"
              >
                <X size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}