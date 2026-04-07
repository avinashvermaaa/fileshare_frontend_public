// src/hooks/useTouchDevice.ts
import { useState, useEffect } from "react";

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if `window` is defined (client-side) before accessing `navigator`
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  return isTouchDevice;
}