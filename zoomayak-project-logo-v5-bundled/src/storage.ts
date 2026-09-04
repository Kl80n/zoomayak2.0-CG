import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const STORAGE_VERSION = 'v1';

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const storageKey = `zoomayak:${STORAGE_VERSION}:${key}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Storage can be unavailable in private/restricted browser contexts.
    }
  }, [storageKey, value]);

  return [value, setValue];
}
