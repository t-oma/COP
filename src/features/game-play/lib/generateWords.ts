import { wordsLibrary } from "~/shared/data/words";
import { shuffle } from "~/shared/utils";
import type { Difficulty, WordsCategory } from "~/shared/types";

const WORD_COUNT_RANGES = {
  easy: { min: 3, max: 4 },
  medium: { min: 5, max: 6 },
  hard: { min: 6, max: 7 },
};
const WORD_LENGTH_RANGES = {
  easy: { min: 3 },
  medium: { min: 4 },
  hard: { min: 5 },
};
const categories = Object.keys(wordsLibrary) as WordsCategory[];

function generateWords(
  size: number,
  difficulty: Difficulty,
  category?: WordsCategory
): string[] {
  const selectedCategory =
    category || categories[Math.floor(Math.random() * categories.length)];

  const categoryWords = wordsLibrary[selectedCategory];
  const difficultyWords = categoryWords[difficulty];

  if (!difficultyWords) {
    throw new Error(
      `No words found for category ${selectedCategory} and difficulty ${difficulty}`
    );
  }

  // Filter words by length suitable for grid size
  const minLength = WORD_LENGTH_RANGES[difficulty].min;
  const maxLength = size;
  const suitableWords = Array.from(difficultyWords).filter(
    (word: string) => word.length >= minLength && word.length <= maxLength
  );

  if (suitableWords.length === 0) {
    throw new Error(
      `No suitable words found for size ${size} and difficulty ${difficulty}`
    );
  }

  const { min: minWords, max: maxWords } = WORD_COUNT_RANGES[difficulty];
  const wordCount = Math.min(
    Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords,
    suitableWords.length
  );

  const shuffled = shuffle(suitableWords);

  return shuffled.slice(0, wordCount);
}

export { generateWords };
