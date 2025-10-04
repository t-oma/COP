import type {
  DifficultyNamedSizes as DifficultyNS,
  NumberNamedSizes as NumberNS,
  Size,
} from "~/shared/types";

export const Sizes: Size[] = [
  { width: 5, height: 5 },
  { width: 7, height: 7 },
  { width: 9, height: 9 },
];

export const NumberNamedSizes: NumberNS = {
  "5x5": Sizes[0],
  "7x7": Sizes[1],
  "9x9": Sizes[2],
};

export const DifficultyNamedSizes: DifficultyNS = {
  easy: /*  */ Sizes[0],
  medium: /**/ Sizes[1],
  hard: /*  */ Sizes[2],
};
