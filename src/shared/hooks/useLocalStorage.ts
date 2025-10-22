import { useCallback, useMemo, useSyncExternalStore } from "react";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (raw: string) => T;
};

export const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function safeParse<T>(
  raw: string,
  fallback: T,
  deserialize?: (raw: string) => T
): T {
  try {
    return deserialize ? deserialize(raw) : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function readFromLS<T>(
  key: string,
  initialValue: T,
  deserialize?: (raw: string) => T
): T {
  if (!isBrowser) return initialValue;

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return initialValue;
    return safeParse<T>(raw, initialValue, deserialize);
  } catch {
    return initialValue;
  }
}

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: Options<T>
) {
  const serialize = useMemo(
    () => options?.serialize ?? ((v: T) => JSON.stringify(v)),
    [options?.serialize]
  );
  const deserialize = options?.deserialize;

  const getSnapshot = useCallback(
    () => readFromLS<T>(key, initialValue, deserialize),
    [key, initialValue, deserialize]
  );

  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  const subscribe = useCallback(
    (notify: () => void) => {
      if (!isBrowser) return () => {};

      const onStorage = (e: Event) => {
        if (e instanceof StorageEvent) {
          if (e.storageArea !== window.localStorage) return;
          if (e.key !== null && e.key !== key) return;
        }

        notify();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener("local-storage", onStorage);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("local-storage", onStorage);
      };
    },
    [key]
  );

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      if (!isBrowser) return;

      try {
        const prev = getSnapshot();
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;

        if (resolved === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, serialize(resolved));
        }

        try {
          const se = new StorageEvent("storage", {
            key,
            oldValue: prev === undefined ? null : serialize(prev),
            newValue: resolved === undefined ? null : serialize(resolved),
            url: window.location.href,
            storageArea: window.localStorage,
          });
          window.dispatchEvent(se);
        } catch {
          window.dispatchEvent(new Event("local-storage"));
        }
      } catch {
        // silently ignore
      }
    },
    [key, serialize, getSnapshot]
  );

  const remove = useCallback(
    () => setValue(undefined as unknown as T),
    [setValue]
  );

  // return [value as T, setValue, remove] as const;
  return {
    value: value as T,
    set: setValue,
    remove,
  };
}

export { useLocalStorage };
