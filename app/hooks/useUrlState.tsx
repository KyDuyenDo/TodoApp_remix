import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

export function useUrlState<T extends string>(
  key: string,
  defaultValue: T,
  options: { [key: string]: T }
): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    const param = searchParams.get(key);
    return param && param in options ? (param as T) : defaultValue;
  }, [searchParams, key, options, defaultValue]);

  const setValue = (newValue: T) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, newValue);
      return next;
    });
  };

  return [value, setValue];
}

