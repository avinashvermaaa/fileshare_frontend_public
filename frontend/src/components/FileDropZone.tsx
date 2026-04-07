// src/components/FileDropZone.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

// Hooks
import { useTouchDevice } from "@/hooks/useTouchDevice"; // Adjust path as needed
import { useDragDrop } from "@/hooks/useDragDrop";     // Adjust path as needed
import { useFileManagement } from "@/hooks/useFileManagement"; // Adjust path as needed
import { usePasswordProtection } from "@/hooks/usePasswordProtection"; // Adjust path as needed
import { useFileUpload } from "@/hooks/useFileUpload"; // Adjust path as needed

// UI Components
import { TransferOptions } from "./TransferOptions";        // Adjust path as needed
import { InitialDropArea } from "./InitialDropArea";        // Adjust path as needed
import { FileListDisplay } from "./FileListDisplay";        // Adjust path as needed
import { TransferDetailsForm } from "./TransferDetailsForm"; // Adjust path as needed
import { TransferFooter } from "./TransferFooter";          // Adjust path as needed

// External / Existing Components
import FilePreview from "@/components/file-preview";      // Existing
import PasswordProtection from "@/components/password-protection"; // Existing
import QrCodeDialog from "./QrCodeDialog";                // Existing

// Types
import { FileWithPreview } from "@/types"; // Adjust path as needed

export default function FileDropZone() {
  // --- State Management ---
  // Using custom hooks for encapsulated logic
  const isTouchDevice = useTouchDevice(); // For conditional UI/UX based on device
  const {
    files,
    addFiles,
    removeFile,
    previewFile,
    openFilePreview,
    closeFilePreview,
    formattedSize,
    setFiles, // Exposed to reset file list after upload
  } = useFileManagement();

  const {
    password,
    showPasswordProtection,
    togglePasswordProtection,
    handlePasswordSet,
    cancelPasswordProtection,
    resetPassword, // Exposed to reset password after upload
  } = usePasswordProtection();

  // Local states
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [transferOption, setTransferOption] = useState<"link">("link"); // Only 'link' for now
  const [lastTransferLink, setLastTransferLink] = useState("");
  const [showQr, setShowQr] = useState(false);

  // Ref for the drop zone
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { isDragging, onDragOver, onDragLeave, onDrop } = useDragDrop({
    onDropFiles: addFiles, // Pass addFiles from useFileManagement
    dropZoneRef,
  });

  // --- Upload Callbacks ---
  const handleUploadSuccess = useCallback((link: string) => {
    setLastTransferLink(link); // Store the link for QR code dialog
    toast.success(`Files ${transferOption === "link"}${password ? " (Password protected)" : ""}`, {
      description: link,
      action: {
        label: "Copy",
        onClick: () => {
          navigator.clipboard.writeText(link)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link"));
        },
      },
      cancel: {
        label: "QR Code",
        onClick: () => setShowQr(true),
      },
    });
  }, [password, transferOption]);

  const handleUploadError = useCallback(() => {
    toast.error("Upload failed", {
      description: "Something went wrong, please try re-uploading.",
    });
  }, []);

  const handleResetForm = useCallback(() => {
    // Reset all form-related states after a successful upload
    setFiles([]); // Resets files from useFileManagement
    setTitle("");
    setMessage("");
    resetPassword(); // Resets password from usePasswordProtection
  }, [setFiles, resetPassword]);

  // Hook for the actual file upload logic
  const { uploadProgress, isUploading, handleTransfer } = useFileUpload({
    files,
    title,
    message,
    transferOption,
    password,
    onUploadSuccess: handleUploadSuccess,
    onUploadError: handleUploadError,
    onResetForm: handleResetForm,
  });

  // --- Render Logic ---
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative -top-5">
      <div className="p-4 space-y-4">
        {/* Top transfer options (e.g., "Link transfer") */}
        <TransferOptions
          transferOption={transferOption}
          setTransferOption={setTransferOption}
        />

        {/* Conditional rendering based on password protection form visibility */}
        {showPasswordProtection ? (
          <PasswordProtection
            onPasswordSet={handlePasswordSet}
            onCancel={cancelPasswordProtection}
          />
        ) : (
          <>
            {/* File input/display area */}
            {files.length === 0 ? (
              <InitialDropArea
                onFilesAdded={addFiles}
                isDragging={isDragging}
                dropZoneRef={dropZoneRef}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              />
            ) : (
              <FileListDisplay
                files={files}
                formattedSize={formattedSize}
                onAddMoreFiles={addFiles}
                onRemoveFile={removeFile}
                onOpenFilePreview={openFilePreview}
              />
            )}

            {/* Title and Message inputs */}
            <TransferDetailsForm
              title={title}
              onTitleChange={setTitle}
              message={message}
              onMessageChange={setMessage}
            />
          </>
        )}
      </div>

      {/* Footer with upload progress, password toggle, and transfer button */}
      <TransferFooter
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        filesExist={files.length > 0}
        showPasswordProtectionForm={showPasswordProtection}
        passwordProtected={!!password} // Check if a password string exists
        onTogglePasswordProtection={togglePasswordProtection}
        onTransfer={handleTransfer}
        transferOption={transferOption}
      />

      {/* QR Code Dialog */}
      {showQr && lastTransferLink && (
        <QrCodeDialog
          link={lastTransferLink}
          open={showQr}
          onClose={() => setShowQr(false)}
        />
      )}

      {/* File Preview Dialog */}
      {previewFile && (
        <FilePreview
          file={previewFile}
          isOpen={!!previewFile}
          onClose={closeFilePreview}
        />
      )}
    </div>
  );
}