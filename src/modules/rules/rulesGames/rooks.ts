import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

export const whiteBlackRooks = (
  c: number,
  f: number,
  orderGame: GameManipulator[],
  name: string,
) => {
  const array: RulesPieces[] = [];

  const opposite = name.includes('white') ? 'black' : 'white';
  const nameFriend = name.includes('white') ? 'white' : 'black';
  const miKing = orderGame.find((e) => e.piece === 'white-king');

  /*funcion de fila baja*/
  const afb: RulesPieces[] = fafb(orderGame, c, f, miKing, nameFriend, opposite);
  /*funcion fila alta */
  const afa: RulesPieces[] = fafa(orderGame, c, f, miKing, nameFriend, opposite);
  /*funcion columna izquierda */
  const aci: RulesPieces[] = faci(orderGame, c, f, miKing, nameFriend, opposite);
  /*funcion columna derecha */
  const acd: RulesPieces[] = facd(orderGame, c, f, miKing, nameFriend, opposite);

  return array.concat(afb, afa, aci, acd);
};

/*funcion de fila baja*/
const fafb = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];

  const final = {
    d: true,
  };

  for (let i = f + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);
    const fb = enemyToKing(c, i, c, f, orderGame, miKing);

    final.d = fb;

    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
      });
    }

    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: i,
        left: c,
      });
      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }

  return final.d ? array : [];
};
/*funcion fila alta */
const fafa = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];

  const final = {
    d: true,
  };

  for (let i = f - 1; i >= 0; i--) {
    console.log(i);
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);
    const fa = enemyToKing(c, i, c, f, orderGame, miKing);
    final.d = fa;

    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
      });
    }

    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: i,
        left: c,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }

  return final.d ? array : [];
};
/*funcion columna izquierda */
const faci = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];

  const final = {
    d: true,
  };

  for (let i = c - 1; i >= 0; i--) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);
    const ci = enemyToKing(i, f, c, f, orderGame, miKing);

    final.d = ci;

    if (findPosition?.piece === '' && ci) {
      array.push({
        top: f,
        left: i,
      });
    }

    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: f,
        left: i,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }
  return final.d ? array : [];
};
/*funcion columna derecha */
const facd = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];

  const final = {
    d: true,
  };

  for (let i = c + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);
    const cd = enemyToKing(i, f, c, f, orderGame, miKing);

    final.d = cd;

    if (findPosition?.piece === '') {
      array.push({
        top: f,
        left: i,
      });
    }

    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: f,
        left: i,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }
  return final.d ? array : [];
};
