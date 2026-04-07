// src/components/TransferFooter.tsx
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Progress } from "@/components/ui/progress"; // Adjust path as needed
import { Upload, Clock, Lock, Unlock } from "lucide-react";

interface TransferFooterProps {
  isUploading: boolean;
  uploadProgress: number;
  filesExist: boolean;
  showPasswordProtectionForm: boolean;
  passwordProtected: boolean; // True if a password has been set
  onTogglePasswordProtection: () => void;
  onTransfer: () => void;
  transferOption: "link";
}

export function TransferFooter({
  isUploading,
  uploadProgress,
  filesExist,
  showPasswordProtectionForm,
  passwordProtected,
  onTogglePasswordProtection,
  onTransfer,
  transferOption,
}: TransferFooterProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
      {isUploading ? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm dark:text-gray-200">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2 bg-fileshare-blue/20" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={16} className="mr-1" />
              <span>7 days</span>
            </div>

            {/* Password Protection Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePasswordProtection}
              className={`text-gray-500 hover:text-fileshare-blue dark:text-gray-400 dark:hover:text-blue-400 ${passwordProtected ? 'text-fileshare-blue dark:text-blue-400' : ''}`}
              title={passwordProtected ? "Password protected" : "Add password protection"}
            >
              {passwordProtected ? (
                <>
                  <Lock size={16} className="mr-1" />
                  <span className="text-xs">Protected</span>
                </>
              ) : (
                <>
                  <Unlock size={16} className="mr-1" />
                  <span className="text-xs">Add password</span>
                </>
              )}
            </Button>
          </div>

          <Button
            onClick={onTransfer}
            // Disable if no files, or if the password protection form is currently open
            disabled={!filesExist || showPasswordProtectionForm}
            className="bg-fileshare-blue hover:bg-blue-600 dark:bg-fileshare-blue dark:hover:bg-blue-700 text-white"
          >
            {transferOption === "link" ? "Get a link" : ""}
            <Upload size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}