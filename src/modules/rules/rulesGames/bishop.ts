import { ref } from 'vue';
import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

export const bishops = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const nameFriend = name.includes('white') ? 'white' : 'black';
  const opposite = name.includes('white') ? 'black' : 'white';
  const miKing = orderGame.find((e) => e.piece === nameFriend + '-king');

  const afsi: RulesPieces[] = fafsi(orderGame, c, f, miKing, nameFriend, opposite);

  const afsd: RulesPieces[] = fasd(orderGame, c, f, miKing, nameFriend, opposite);

  const afii: RulesPieces[] = faii(orderGame, c, f, miKing, nameFriend, opposite);

  const afid: RulesPieces[] = faid(orderGame, c, f, miKing, nameFriend, opposite);

  return array.concat(afsi, afsd, afii, afid);
};

const fafsi = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];
  interface Pass {
    d: boolean;
  }

  const final: Pass = {
    d: true,
  };

  const decisions: Pass[] = [];

  const cis = c - 1;
  const fis = ref<number>(f - 1);

  for (let i = cis; i >= 0; i--) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fis.value);
    const is = enemyToKing(i, fis.value, c, f, orderGame, miKing);

    final.d = is;

    decisions.push({
      d: is,
    });

    if (fis.value >= 0) {
      if (findPost?.piece === '' && is) {
        arrayTwo.push({
          top: fis.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && is) {
        arrayTwo.push({
          top: fis.value,
          left: i,
        });
      }

      if (findPost?.piece === '') {
        array.push({
          top: fis.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fis.value,
          left: i,
        });

        if (findPost?.piece.includes(opposite + '-king')) {
          console.log('jaque');
        }
        break;
      } else {
        break;
      }
    } else {
      break;
    }

    fis.value--;
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

const fasd = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];

  const final = {
    d: true,
  };
  interface Pass {
    d: boolean;
  }
  const decisions: Pass[] = [];

  const cds = c + 1;
  const fds = ref<number>(f - 1);

  for (let i = cds; i <= 7; i++) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fds.value);

    console.log('superior derecha');
    const ds = enemyToKing(i, fds.value, c, f, orderGame, miKing);
    final.d = ds;

    decisions.push({
      d: ds,
    });

    if (fds.value >= 0) {
      if (findPost?.piece === '' && ds) {
        arrayTwo.push({
          top: fds.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && ds) {
        arrayTwo.push({
          top: fds.value,
          left: i,
        });
      }

      if (findPost?.piece === '') {
        array.push({
          top: fds.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fds.value,
          left: i,
        });
        if (findPost?.piece.includes(opposite + '-king')) {
          console.log('jaque');
        }
        break;
      } else {
        break;
      }
    } else {
      break;
    }
    fds.value--;
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

const faii = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];

  const final = {
    d: true,
  };

  interface Pass {
    d: boolean;
  }
  const decisions: Pass[] = [];

  const cii = c - 1;
  const fii = ref<number>(f + 1);

  for (let i = cii; i >= 0; i--) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fii.value);
    const ii = enemyToKing(i, fii.value, c, f, orderGame, miKing);

    final.d = ii;

    decisions.push({
      d: ii,
    });
    if (fii.value <= 7) {
      if (findPost?.piece === '' && ii) {
        arrayTwo.push({
          top: fii.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && ii) {
        arrayTwo.push({
          top: fii.value,
          left: i,
        });
      }

      if (findPost?.piece === '') {
        array.push({
          top: fii.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fii.value,
          left: i,
        });
        if (findPost?.piece.includes(opposite + '-king')) {
          console.log('jaque');
        }
        break;
      } else {
        break;
      }
    } else {
      break;
    }
    fii.value++;
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

const faid = (
  orderGame: GameManipulator[],
  c: number,
  f: number,
  miKing: GameManipulator | undefined,
  nameFriend: string,
  opposite: string,
) => {
  const array: RulesPieces[] = [];
  const arrayTwo: RulesPieces[] = [];

  const final = {
    d: true,
  };
  interface Pass {
    d: boolean;
  }
  const decisions: Pass[] = [];
  const cdi = c + 1;
  const fdi = ref<number>(f + 1);

  /*derecha inferior */

  for (let i = cdi; i <= 7; i++) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fdi.value);
    const di = enemyToKing(i, fdi.value, c, f, orderGame, miKing);

    final.d = di;

    decisions.push({
      d: di,
    });
    if (fdi.value <= 7) {
      if (findPost?.piece === '' && di) {
        arrayTwo.push({
          top: fdi.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && di) {
        arrayTwo.push({
          top: fdi.value,
          left: i,
        });
      }

      if (findPost?.piece === '') {
        array.push({
          top: fdi.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fdi.value,
          left: i,
        });
        if (findPost?.piece.includes(opposite + '-king')) {
          console.log('jaque');
        }
        break;
      } else {
        break;
      }
    } else {
      break;
    }
    fdi.value++;
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
