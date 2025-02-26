/*reglas de los peones blancos y negros */

import type { RulesPieces } from '../interfaces/pieces.interface';

/*blancos */
export const whitePawns = (c: number, f: number) => {
  const d = {
    top: f,
    left: c,
  };
  const array: RulesPieces[] = [];

  if (f === 6) {
    for (let i = 0; i < 2; i++) {
      d.top--;
      array.push({
        top: d.top,
        left: d.left,
      });
    }
    return array;
  }

  console.log('si');

  array.push({
    top: d.top - 1,
    left: d.left,
  });

  return array;
};
/*negros */
export const blackPawns = (c: number, f: number) => {
  const d = {
    top: f,
    left: c,
  };

  const array: RulesPieces[] = [];

  if (f === 1) {
    for (let i = 0; i < 2; i++) {
      d.top++;
      array.push({
        top: d.top,
        left: d.left,
      });
    }
    return array;
  }

  array.push({
    top: d.top + 1,
    left: d.left,
  });

  return array;
};
