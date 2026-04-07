// src/components/TransferOptions.tsx
import { Button } from "@/components/ui/button"; // Adjust path as needed

interface TransferOptionsProps {
  transferOption: "link";
  setTransferOption: (option: "link") => void;
}

export function TransferOptions({ transferOption, setTransferOption }: TransferOptionsProps) {
  return (
    <div className="flex justify-center gap-4 mb-2">
      <Button
        variant={transferOption === "link" ? "default" : "outline"}
        onClick={() => setTransferOption("link")}
        className={transferOption === "link" ? "bg-fileshare-blue dark:bg-fileshare-blue" : ""}
      >
        Link transfer
      </Button>
      {/* Potentially add other transfer options here (e.g., "Email transfer") */}
    </div>
  );
}