export type Size = {
  width: number;
  height: number;
};

export type NumberNamedSizes = {
  "5x5": Size;
  "7x7": Size;
  "9x9": Size;
};

export type DifficultyNamedSizes = {
  easy: Size;
  medium: Size;
  hard: Size;
};
