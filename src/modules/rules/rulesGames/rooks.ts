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
  const miKing = orderGame.find((e) => e.piece === nameFriend + '-king');

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
  interface Pass {
    d: boolean;
  }
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];
  const decisions: Pass[] = [];
  const final = {
    d: true,
  };

  for (let i = f + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);
    const fb = enemyToKing(c, i, c, f, orderGame, miKing);

    final.d = fb;
    decisions.push({
      d: fb,
    });

    if (findPosition?.piece === '' && fb) {
      console.log('marcar');
      arrayTwo.push({
        top: i,
        left: c,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend) && fb) {
      arrayTwo.push({
        top: i,
        left: c,
        co: false,
      });
    }

    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend)) {
      array.push({
        top: i,
        left: c,
        co: false,
      });
      if (findPosition?.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    } else {
      break;
    }
  }

  if (decisions[0]) {
    if (decisions[0].d) {
      return arrayTwo;
    } else if (!decisions[0].d && decisions[decisions.length - 1].d) {
      return array;
    }
  }
  return [];
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
  interface Pass {
    d: boolean;
  }
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];
  const decisions: Pass[] = [];

  const final = {
    d: true,
  };

  for (let i = f - 1; i >= 0; i--) {
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);
    const fa = enemyToKing(c, i, c, f, orderGame, miKing);
    final.d = fa;

    decisions.push({
      d: fa,
    });

    if (findPosition?.piece === '' && fa) {
      arrayTwo.push({
        top: i,
        left: c,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend) && fa) {
      arrayTwo.push({
        top: i,
        left: c,
        co: false,
      });
    }

    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend)) {
      array.push({
        top: i,
        left: c,
        co: false,
      });
      if (findPosition?.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    } else {
      break;
    }
  }
  //console.log(decisions);
  if (decisions[0]) {
    if (decisions[0].d) {
      return arrayTwo;
    } else if (!decisions[0].d && decisions[decisions.length - 1].d) {
      return array;
    }
  }

  return [];
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
  interface Pass {
    d: boolean;
  }
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];
  const decisions: Pass[] = [];

  const final = {
    d: true,
  };

  for (let i = c - 1; i >= 0; i--) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);
    const ci = enemyToKing(i, f, c, f, orderGame, miKing);

    final.d = ci;

    decisions.push({
      d: ci,
    });

    if (findPosition?.piece === '' && ci) {
      arrayTwo.push({
        top: f,
        left: i,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend) && ci) {
      arrayTwo.push({
        top: f,
        left: i,
        co: false,
      });
    }

    if (findPosition?.piece === '' && ci) {
      array.push({
        top: f,
        left: i,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend)) {
      array.push({
        top: f,
        left: i,
        co: false,
      });
      if (findPosition?.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    } else {
      break;
    }
  }

  if (decisions[0]) {
    if (decisions[0].d) {
      return arrayTwo;
    } else if (!decisions[0].d && decisions[decisions.length - 1].d) {
      return array;
    }
  }
  return [];
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
  interface Pass {
    d: boolean;
  }
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];
  const decisions: Pass[] = [];

  const final = {
    d: true,
  };

  for (let i = c + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);
    const cd = enemyToKing(i, f, c, f, orderGame, miKing);

    final.d = cd;

    decisions.push({
      d: cd,
    });

    if (findPosition?.piece === '' && cd) {
      arrayTwo.push({
        top: f,
        left: i,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend) && cd) {
      arrayTwo.push({
        top: f,
        left: i,
        co: false,
      });
    }

    if (findPosition?.piece === '') {
      array.push({
        top: f,
        left: i,
        co: false,
      });
    } else if (!findPosition?.piece.includes(nameFriend)) {
      array.push({
        top: f,
        left: i,
        co: false,
      });
      if (findPosition?.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    } else {
      break;
    }
  }

  if (decisions[0]) {
    if (decisions[0].d) {
      return arrayTwo;
    } else if (!decisions[0].d && decisions[decisions.length - 1].d) {
      return array;
    }
  }
  return [];
};
