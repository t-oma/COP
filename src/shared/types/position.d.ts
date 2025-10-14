export interface Position {
  row: number;
  col: number;
}

// export type Direction = "horizontal" | "vertical" | "diagonal";

export type Direction = { dr: number; dc: number };
