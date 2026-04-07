// src/hooks/usePasswordProtection.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";

export function usePasswordProtection() {
  const [password, setPassword] = useState("");
  const [showPasswordProtection, setShowPasswordProtection] = useState(false);

  const togglePasswordProtection = useCallback(() => {
    setShowPasswordProtection(prev => !prev);
  }, []);

  const handlePasswordSet = useCallback((newPassword: string) => {
    setPassword(newPassword);
    setShowPasswordProtection(false);
    toast.success("Password protection added");
  }, []);

  const cancelPasswordProtection = useCallback(() => {
    setShowPasswordProtection(false);
  }, []);

  const resetPassword = useCallback(() => {
    setPassword("");
  }, []);

  return {
    password,
    showPasswordProtection,
    togglePasswordProtection,
    handlePasswordSet,
    cancelPasswordProtection,
    resetPassword,
  };
}