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

  /*encontrar pieza enemiga  izquierda*/

  if (c - 1 >= 0 && f - 1 >= 0) {
    const ei = orderGame.find((e) => e.left === c - 1 && e.top === f - 1);
    if (ei?.piece.includes('black')) {
      array.push({
        top: f - 1,
        left: c - 1,
      });
    }
  }

  /*encontrar pieza enemiga  derecha*/

  if (c + 1 <= 7 && f - 1 >= 0) {
    const ed = orderGame.find((e) => e.left === c + 1 && e.top === f - 1);

    if (ed?.piece.includes('black')) {
      array.push({
        top: f - 1,
        left: c + 1,
      });
    }
  }

  if (f === 6) {
    for (let i = 0; i < 2; i++) {
      d.top--;

      const o = orderGame.find((e) => e.left === c && e.top === d.top);

      if (o?.piece === '') {
        array.push({
          top: d.top,
          left: d.left,
        });
      } else {
        break;
      }
    }
    return array;
  }
  /*paso al frente */

  const r = orderGame.find((e) => e.left === c && e.top === d.top - 1);
  if (r?.piece === '') {
    array.push({
      top: d.top - 1,
      left: d.left,
    });
  }

  return array;
};
/*negros */
export const blackPawns = (c: number, f: number, orderGame: GameManipulator[]) => {
  const d = {
    top: f,
    left: c,
  };

  const array: RulesPieces[] = [];

  /*encontrar pieza enemiga  izquierda*/

  if (c - 1 >= 0 && f + 1 <= 7) {
    const ei = orderGame.find((e) => e.left === c - 1 && e.top === f + 1);
    if (ei?.piece.includes('white')) {
      array.push({
        top: f + 1,
        left: c - 1,
      });
    }
  }

  /*encontrar pieza enemiga  derecha*/

  if (c + 1 <= 7 && f + 1 <= 7) {
    const ed = orderGame.find((e) => e.left === c + 1 && e.top === f + 1);

    if (ed?.piece.includes('white')) {
      array.push({
        top: f + 1,
        left: c + 1,
      });
    }
  }
  if (f === 1) {
    for (let i = 0; i < 2; i++) {
      d.top++;

      const o = orderGame.find((e) => e.left === c && e.top === d.top);
      if (o?.piece === '') {
        array.push({
          top: d.top,
          left: d.left,
        });
      } else {
        break;
      }
    }
    return array;
  }
  /*paso al frente */
  const r = orderGame.find((e) => e.left === c && e.top === d.top + 1);

  if (r?.piece === '') {
    array.push({
      top: d.top + 1,
      left: d.left,
    });
  }

  return array;
};
