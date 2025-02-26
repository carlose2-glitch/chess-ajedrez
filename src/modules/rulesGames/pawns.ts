/*reglas de los peones blancos y negros */

import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';

/*blancos */
export const whitePawns = (c: number, f: number, orderGame: GameManipulator[]) => {
  /* paso inicial*/
  const d = {
    top: f,
    left: c,
  };
  const array: RulesPieces[] = [];

  if (f === 6) {
    for (let i = 0; i < 2; i++) {
      d.top--;

      const o = orderGame.find((e) => e.left === c && e.top === d.top);

      if (o?.piece === '') {
        array.push({
          top: d.top,
          left: d.left,
        });
      }
    }
    return array;
  }
  /*paso al frente */
  array.push({
    top: d.top - 1,
    left: d.left,
  });

  return array;
};
/*negros */
export const blackPawns = (c: number, f: number, orderGame: GameManipulator[]) => {
  const d = {
    top: f,
    left: c,
  };

  const array: RulesPieces[] = [];

  if (f === 1) {
    for (let i = 0; i < 2; i++) {
      d.top++;

      const o = orderGame.find((e) => e.left === c && e.top === d.top);
      if (o?.piece === '') {
        array.push({
          top: d.top,
          left: d.left,
        });
      }
    }
    return array;
  }

  array.push({
    top: d.top + 1,
    left: d.left,
  });

  return array;
};
