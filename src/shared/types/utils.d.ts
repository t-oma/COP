export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export type Includes<T extends readonly unknown[], U> = T extends readonly [
  infer F,
  ...infer R,
]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

export type IsUnique<T extends readonly unknown[]> = T extends readonly [
  infer F,
  ...infer R,
]
  ? Includes<R, F> extends true
    ? false
    : IsUnique<R>
  : true;
