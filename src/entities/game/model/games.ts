import type { Game } from './types';

export const games: Game[] = [
  {
    id: 1,
    title: 'Weather',
    link: '/weather',
    difficulty: 'easy',
    words: ['sun', 'rain', 'snow', 'cloud'],
  },
  {
    id: 2,
    title: 'Animals',
    link: '/animals',
    difficulty: 'medium',
    words: ['cat', 'dog', 'bird', 'fish', 'snake'],
  },
  {
    id: 3,
    title: 'Colors',
    link: '/colors',
    difficulty: 'easy',
    words: ['red', 'blue', 'green', 'yellow', 'purple'],
  },
  {
    id: 4,
    title: 'Fruits',
    link: '/fruits',
    difficulty: 'medium',
    words: ['apple', 'banana', 'orange', 'grape', 'strawberry'],
  },
];
