/*reglas de los peones blancos y negros */

import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
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
  console.log('peon blanco');

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

  /*captura al paso */
  /*verifica que sea un peon negro y que la pieza solo halla hecho un movimiento*/
  const blackPawns = orderGame.filter(
    (e) => e.top === 3 && e.piece.includes('black-pawn') && e.movements === 1,
  );

  if (d.top === 3 && blackPawns[0]) {
    /*filtra el peon que este tanto del lado derecho como el izquierdo y tambien verifica que tanto diagonal izquierdo como derecho este vacio*/
    const filterPawnLeft = blackPawns.filter((e) => e.left === c - 1);
    const filterPawnRight = blackPawns.filter((e) => e.left === c + 1);
    /*si esta vacio el espacio a mover */
    const left = orderGame.find((e) => e.left === c - 1 && e.top === d.top - 1 && e.piece === '');
    const right = orderGame.find((e) => e.left === c + 1 && e.top === d.top - 1 && e.piece === '');
    /*verifica si los pasos diagonales estan en jaque */
    const captureOnTheGoLeft = enemyToKing(c - 1, d.top - 1, c, d.top, orderGame, myKing);
    const captureOnTheGoRight = enemyToKing(c + 1, d.top - 1, c, d.top, orderGame, myKing);

    if (filterPawnLeft[0] && left && captureOnTheGoLeft) {
      array.push({
        top: left.top,
        left: left.left,
      });
    }
    if (filterPawnRight[0] && right && captureOnTheGoRight) {
      array.push({
        top: right.top,
        left: right.left,
      });
    }
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
  const myKing = orderGame.find((e) => e.piece === 'black-king');

  /*encontrar pieza enemiga  izquierda*/

  if (c - 1 >= 0 && f + 1 <= 7) {
    const ei = orderGame.find((e) => e.left === c - 1 && e.top === f + 1);
    const iz = enemyToKing(c - 1, f + 1, c, f, orderGame, myKing);

    if (ei?.piece.includes('white') && iz) {
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
    const id = enemyToKing(c + 1, f + 1, c, f, orderGame, myKing);

    if (ed?.piece.includes('white') && id) {
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
  const r = orderGame.find((e) => e.left === c && e.top === d.top + 1);
  const front = enemyToKing(c, d.top + 1, c, f, orderGame, myKing);
  if (r?.piece === '' && front) {
    array.push({
      top: d.top + 1,
      left: d.left,
    });
  }

  const whitePawns = orderGame.filter(
    (e) => e.top === 4 && e.piece.includes('white-pawn') && e.movements === 1,
  );

  if (d.top === 4 && whitePawns[0]) {
    /*filtra el peon que este tanto del lado derecho como el izquierdo y tambien verifica que tanto diagonal izquierdo como derecho este vacio*/
    const filterPawnLeft = whitePawns.filter((e) => e.left === c - 1);
    const filterPawnRight = whitePawns.filter((e) => e.left === c + 1);
    /*si esta vacio el espacio a mover */
    const left = orderGame.find((e) => e.left === c - 1 && e.top === d.top + 1 && e.piece === '');
    const right = orderGame.find((e) => e.left === c + 1 && e.top === d.top + 1 && e.piece === '');
    /*verifica si los pasos diagonales estan en jaque */
    const captureOnTheGoLeft = enemyToKing(c - 1, d.top + 1, c, d.top, orderGame, myKing);
    const captureOnTheGoRight = enemyToKing(c + 1, d.top + 1, c, d.top, orderGame, myKing);

    if (filterPawnLeft[0] && left && captureOnTheGoLeft) {
      array.push({
        top: left.top,
        left: left.left,
      });
    }
    if (filterPawnRight[0] && right && captureOnTheGoRight) {
      array.push({
        top: right.top,
        left: right.left,
      });
    }
  }

  return array;
};
