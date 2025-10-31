export type WordsCategory = "animals" | "weather" | "colors" | "fruits";

export type LibraryCategory = {
  readonly easy?: ReadonlySet<string>;
  readonly medium?: ReadonlySet<string>;
  readonly hard?: ReadonlySet<string>;
};

export type WordsLibrary = {
  readonly [key in WordsCategory]: LibraryCategory;
};
