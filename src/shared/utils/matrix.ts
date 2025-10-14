import type { Direction, Position } from "../types";

export function mapDirection<T>(
  matrix: readonly T[][],
  read: {
    length: number;
    startPos: Position;
    dir: Direction;
    callback: (matrix: T[][], pos: Position, index: number) => void;
  }
) {
  const copy = matrix.map((row) => row.slice());
  let { row, col } = read.startPos;

  for (let k = 0; k < read.length; k++) {
    if (!copy[row]) copy[row] = [];

    read.callback(copy, { row, col }, k);

    row += read.dir.dr;
    col += read.dir.dc;
  }

  return copy;
}

export function insertLine<T>(
  matrix: readonly T[][],
  insert: {
    items: T[];
    startPos: Position;
    dir: Direction;
  }
): { matrix: T[][]; positions: Position[] } {
  // const copy = matrix.map((row) => row.slice());
  const positions: Position[] = [];
  const { row, col } = insert.startPos;

  const newMatrix = mapDirection(matrix, {
    length: insert.items.length,
    startPos: { row, col },
    dir: insert.dir,
    callback: (matrix, pos, index) => {
      matrix[pos.row][pos.col] = insert.items[index];
      positions.push(pos);
    },
  });

  // for (let k = 0; k < insert.items.length; k++) {
  //   if (!copy[row]) copy[row] = [];
  //   copy[row][col] = insert.items[k];
  //   positions.push({ row, col });
  //   row += insert.dir.dr;
  //   col += insert.dir.dc;
  // }

  return { matrix: newMatrix, positions };
}

export function itemsAtPositions<T>(
  matrix: readonly T[][],
  positions: Position[]
): T[][] {
  const items: T[][] = [];

  for (const pos of positions) {
    if (!items[pos.row]) items[pos.row] = [];
    items[pos.row][pos.col] = matrix[pos.row][pos.col];
  }

  return items;
}

export function itemsAtDirection<T>(
  matrix: readonly T[][],
  startPos: Position,
  dir: Direction
): T[][] {
  const items: T[][] = [];

  const { row, col } = startPos;

  for (let i = row; i < row + dir.dr; i++) {
    if (!items[i]) items[i] = [];
    items[i][col] = matrix[i][col];
  }

  return items;
}

export function previewVector(
  startPos: Position,
  dir: Direction,
  length: number
): Position[] {
  const items: Position[] = [];

  let { row, col } = startPos;

  for (let i = 0; i < length; i++) {
    items[i] = { row, col };
    row += dir.dr;
    col += dir.dc;
  }

  return items;
}
