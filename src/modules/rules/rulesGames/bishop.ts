import { ref } from 'vue';
import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

export const bishops = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const nameFriend = name.includes('white') ? 'white' : 'black';
  const opposite = name.includes('white') ? 'black' : 'white';
  const miKing = orderGame.find((e) => e.piece === nameFriend + '-king');

  const cis = c - 1;
  const fis = ref<number>(f - 1);

  const cds = c + 1;
  const fds = ref<number>(f - 1);

  const cii = c - 1;
  const fii = ref<number>(f + 1);

  const cdi = c + 1;
  const fdi = ref<number>(f + 1);

  /* izquierda superior */

  for (let i = cis; i >= 0; i--) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fis.value);
    const is = enemyToKing(i, fis.value, c, f, orderGame, miKing);

    if (fis.value >= 0) {
      if (findPost?.piece === '' && is) {
        array.push({
          top: fis.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && is) {
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
  /*derecha superior */

  for (let i = cds; i <= 7; i++) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fds.value);
    const ds = enemyToKing(i, fds.value, c, f, orderGame, miKing);
    if (fds.value >= 0) {
      if (findPost?.piece === '' && ds) {
        array.push({
          top: fds.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && ds) {
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
  /*izquierda inferior */

  for (let i = cii; i >= 0; i--) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fii.value);
    const ii = enemyToKing(i, fii.value, c, f, orderGame, miKing);
    if (fii.value <= 7) {
      if (findPost?.piece === '' && ii) {
        array.push({
          top: fii.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && ii) {
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
  /*derecha inferior */

  for (let i = cdi; i <= 7; i++) {
    const findPost = orderGame.find((e) => e.left === i && e.top === fdi.value);
    const di = enemyToKing(i, fdi.value, c, f, orderGame, miKing);
    if (fdi.value <= 7) {
      if (findPost?.piece === '' && di) {
        array.push({
          top: fdi.value,
          left: i,
        });
      } else if (!findPost?.piece.includes(nameFriend) && di) {
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

  return array;
};
