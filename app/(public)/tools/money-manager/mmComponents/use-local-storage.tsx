"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      const enabled = window.localStorage.getItem(`${key}_enabled`) === "true";

      if (enabled && item) {
        setStoredValue(JSON.parse(item));
      }
      setIsEnabled(enabled);
    } catch (error) {
      console.log(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Set value with localStorage persistence
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (isEnabled) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Toggle localStorage on/off
  const toggleStorage = (enabled: boolean) => {
    setIsEnabled(enabled);
    window.localStorage.setItem(`${key}_enabled`, enabled.toString());

    if (enabled) {
      // Save current state to localStorage when enabling
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } else {
      // Remove from localStorage when disabling (optional)
      // window.localStorage.removeItem(key)
    }
  };

  return [storedValue, setValue, isEnabled, toggleStorage] as const;
}
