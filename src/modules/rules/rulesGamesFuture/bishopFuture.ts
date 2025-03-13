import type { GameManipulator, RulesPieces } from '@/modules/interfaces/pieces.interface';
import { ref } from 'vue';

export const bishopFuture = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const nameFriend = name.includes('white') ? 'white' : 'black';
  const opposite = name.includes('white') ? 'black' : 'white';

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

    if (fis.value >= 0) {
      if (findPost?.piece === '') {
        array.push({
          top: fis.value,
          left: i,
          co: false,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fis.value,
          left: i,
          co: false,
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
    if (fds.value >= 0) {
      if (findPost?.piece === '') {
        array.push({
          top: fds.value,
          left: i,
          co: false,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fds.value,
          left: i,
          co: false,
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
    if (fii.value <= 7) {
      if (findPost?.piece === '') {
        array.push({
          top: fii.value,
          left: i,
          co: false,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fii.value,
          left: i,
          co: false,
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
    if (fdi.value <= 7) {
      if (findPost?.piece === '') {
        array.push({
          top: fdi.value,
          left: i,
          co: false,
        });
      } else if (!findPost?.piece.includes(nameFriend)) {
        array.push({
          top: fdi.value,
          left: i,
          co: false,
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
