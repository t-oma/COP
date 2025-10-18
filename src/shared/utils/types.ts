import type { IsUnique } from "../types";

export function defineUniqueSet<T extends unknown[]>(
  array: IsUnique<T> extends true ? T : never
): ReadonlySet<T[number]> {
  return new Set(array) as ReadonlySet<T[number]>;
}

export function defineWordSet<T extends readonly string[]>(
  words: IsUnique<T> extends true ? T : never
): ReadonlySet<T[number]> {
  return new Set(words) as ReadonlySet<T[number]>;
}
