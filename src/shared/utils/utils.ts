import type { Size } from "../types";

export function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet.charAt(randomIndex);
}

export function gridLetters({ width, height }: Size) {
  const letters = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      letters.push(getRandomLetter());
    }
  }
  return letters;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
