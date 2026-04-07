// src/components/InitialDropArea.tsx
import { Plus } from "lucide-react";
import { useRef, useCallback } from "react";
import { useTouchDevice } from "@/hooks/useTouchDevice"; // Adjust path as needed

interface InitialDropAreaProps {
  onFilesAdded: (files: File[]) => void;
  isDragging: boolean;
  dropZoneRef: React.RefObject<HTMLDivElement>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function InitialDropArea({
  onFilesAdded,
  isDragging,
  dropZoneRef,
  onDragOver,
  onDragLeave,
  onDrop,
}: InitialDropAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isTouchDevice = useTouchDevice();

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesAdded(selectedFiles);
      e.target.value = ""; // Clear the input value for subsequent selections
    }
  }, [onFilesAdded]);

  return (
    <div
      ref={dropZoneRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleBrowse} // Trigger file input on click
      className={`file-drop-zone ${isDragging ? 'drag-active' : ''} cursor-pointer dark:border-gray-700 dark:text-gray-300`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <Plus size={24} className="mx-auto mb-2 text-gray-500 dark:text-gray-400" />
      <div className="font-medium text-lg">
        {isTouchDevice ? 'Tap to add files' : 'Add files'}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {isTouchDevice ? 'Or hold for options' : 'Or select a folder'}
      </div>
    </div>
  );
}