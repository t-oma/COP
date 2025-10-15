export type LibraryCategory = {
  readonly easy?: ReadonlySet<string>;
  readonly medium?: ReadonlySet<string>;
  readonly hard?: ReadonlySet<string>;
};

export type WordsLibrary = {
  readonly animals: LibraryCategory;
  readonly weather: LibraryCategory;
  readonly colors: LibraryCategory;
};
