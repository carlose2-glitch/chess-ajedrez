import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';

export const kingFuture = (c: number, r: number, orderGame: GameManipulator[]) => {
  const array: RulesPieces[] = [];

  for (const p of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + p.left && e.top === r + p.top);

    /*evalua si no hay un enemigo en la posicion */
    if (findPost?.piece === '') {
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
