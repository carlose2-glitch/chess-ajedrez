/*reglas de los peones blancos y negros */

import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

/*blancos */
export const whitePawns = (c: number, f: number, orderGame: GameManipulator[]) => {
  /* paso inicial*/
  const d = {
    top: f,
    left: c,
  };
  const array: RulesPieces[] = [];
  const myKing = orderGame.find((e) => e.piece === 'white-king');

  /*encontrar pieza enemiga izquierda*/

  if (c - 1 >= 0 && f - 1 >= 0) {
    const ei = orderGame.find((e) => e.left === c - 1 && e.top === f - 1);
    /*detectar si un enemigo se encuentra en direccion al rey */
    /*izquierda */
    const iz = enemyToKing(c - 1, f - 1, c, f, orderGame, myKing);

    if (ei?.piece.includes('black') && iz) {
      array.push({
        top: f - 1,
        left: c - 1,
      });
    }
    if (ei?.piece.includes('black-king')) {
      console.log('jaque');
    }
  }

  /*encontrar pieza enemiga  derecha*/

  if (c + 1 <= 7 && f - 1 >= 0) {
    const ed = orderGame.find((e) => e.left === c + 1 && e.top === f - 1);
    const id = enemyToKing(c + 1, f - 1, c, f, orderGame, myKing);

    if (ed?.piece.includes('black') && id) {
      array.push({
        top: f - 1,
        left: c + 1,
      });
    }
    if (ed?.piece.includes('black-king')) {
      console.log('jaque');
    }
  }

  if (f === 6) {
    for (let i = 0; i < 2; i++) {
      d.top--;

      const o = orderGame.find((e) => e.left === c && e.top === d.top);
      const front = enemyToKing(c, d.top, c, f, orderGame, myKing);

      if (o?.piece === '' && front) {
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
  const front = enemyToKing(c, d.top - 1, c, f, orderGame, myKing);
  if (r?.piece === '' && front) {
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
    if (ei?.piece.includes('white-king')) {
      console.log('jaque');
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
    if (ed?.piece.includes('white-king')) {
      console.log('jaque');
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
