import type { GameManipulator, RulesPieces } from '@/modules/interfaces/pieces.interface';

export const pawnFuture = (c: number, r: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  if (name.includes('white')) {
    /*encontrar pieza enemiga izquierda */
    if (c - 1 >= 0 && r - 1 >= 0) {
      const ei = orderGame.find((e) => e.left === c - 1 && e.top === r - 1);
      if (ei?.piece === '') {
        array.push({
          top: r - 1,
          left: c - 1,
        });
      }
    }

    /*encontrar pieza enemiga  derecha*/

    if (c + 1 <= 7 && r - 1 >= 0) {
      const ed = orderGame.find((e) => e.left === c + 1 && e.top === r - 1);

      if (ed?.piece === '') {
        array.push({
          top: r - 1,
          left: c + 1,
        });
      }
    }
  } else {
    /*negras */

    /*encontrar pieza enemiga  izquierda*/

    if (c - 1 >= 0 && r + 1 <= 7) {
      const ei = orderGame.find((e) => e.left === c - 1 && e.top === r + 1);
      if (ei?.piece === '') {
        array.push({
          top: r + 1,
          left: c - 1,
        });
      }
    }

    /*encontrar pieza enemiga  derecha*/

    if (c + 1 <= 7 && r + 1 <= 7) {
      const ed = orderGame.find((e) => e.left === c + 1 && e.top === r + 1);

      if (ed?.piece === '') {
        array.push({
          top: r + 1,
          left: c + 1,
        });
      }
    }
  }

  return array;
};
