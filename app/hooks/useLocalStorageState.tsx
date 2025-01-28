import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue
          ? JSON.parse(event.newValue)
          : defaultValue;
        setState(newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, defaultValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
