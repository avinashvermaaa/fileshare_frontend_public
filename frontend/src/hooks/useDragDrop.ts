// src/hooks/useDragDrop.ts
import { useState, useCallback, useRef, useEffect } from "react";
import { useTouchDevice } from "./useTouchDevice"; // Assuming this is in the same `hooks` directory

interface UseDragDropProps {
  onDropFiles: (files: File[]) => void;
  dropZoneRef: React.RefObject<HTMLDivElement>;
}

export function useDragDrop({ onDropFiles, dropZoneRef }: UseDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const isTouchDevice = useTouchDevice(); // Use the touch device hook

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragging to false if the mouse leaves the entire drop zone element
    // and not just a child element within it.
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, [dropZoneRef]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    onDropFiles(droppedFiles);
  }, [onDropFiles]);

  // Add touch event listeners for mobile to simulate drag-like state
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    let touchTimeout: NodeJS.Timeout;

    const handleTouchStart = () => {
      // Set a timeout to differentiate between a quick tap and a "long press" drag intention
      touchTimeout = setTimeout(() => {
        setIsDragging(true);
      }, 200);
    };

    const handleTouchEnd = () => {
      clearTimeout(touchTimeout);
      setIsDragging(false);
    };

    // Only apply touch listeners if it's a touch device
    if (isTouchDevice) {
      dropZone.addEventListener('touchstart', handleTouchStart);
      dropZone.addEventListener('touchend', handleTouchEnd);
      dropZone.addEventListener('touchcancel', handleTouchEnd);
    }

    return () => {
      if (isTouchDevice) {
        dropZone.removeEventListener('touchstart', handleTouchStart);
        dropZone.removeEventListener('touchend', handleTouchEnd);
        dropZone.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [dropZoneRef, isTouchDevice]); // Depend on dropZoneRef and isTouchDevice

  return { isDragging, onDragOver, onDragLeave, onDrop };
}