// src/components/TransferDetailsForm.tsx
import { Input } from "@/components/ui/input"; // Adjust path as needed

interface TransferDetailsFormProps {
  title: string;
  onTitleChange: (title: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
}

export function TransferDetailsForm({
  title,
  onTitleChange,
  message,
  onMessageChange,
}: TransferDetailsFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="transfer-title" className="block text-sm font-medium dark:text-gray-200">
          Title
        </label>
        <Input
          id="transfer-title"
          placeholder="Title for your transfer"
          className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="transfer-message" className="block text-sm font-medium dark:text-gray-200">
          Message
        </label>
        <Input
          id="transfer-message"
          placeholder="Add a message (optional)"
          className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />
      </div>
    </>
  );
}