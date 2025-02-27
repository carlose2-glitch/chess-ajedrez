import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';

export const kings = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];
  const nameFriend = name.includes('white') ? 'white' : 'black';

  for (const p of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + p.left && e.top === f + p.top);

    if (findPost && !findPost.piece.includes(nameFriend)) {
      array.push({
        top: findPost.top,
        left: findPost.left,
      });
    }
  }
  return array;
};

const positionsValid: RulesPieces[] = [
  {
    top: -1,
    left: -1,
  },
  {
    top: -1,
    left: 0,
  },
  {
    top: -1,
    left: 1,
  },
  {
    top: 0,
    left: 1,
  },
  {
    top: 1,
    left: 1,
  },
  {
    top: 1,
    left: 0,
  },
  {
    top: 1,
    left: -1,
  },
  {
    top: 0,
    left: -1,
  },
];
