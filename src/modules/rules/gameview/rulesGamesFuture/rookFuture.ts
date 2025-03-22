import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';

export const rookFuture = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const opposite = name.includes('white') ? 'black' : 'white';
  const nameFriend = name.includes('white') ? 'white' : 'black';

  /*verificacion de la fila baja*/
  for (let i = f + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);

    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
        co: false,
      });
    }
    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: i,
        left: c,
        co: false,
      });
      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }

  /*verificacion fila alta*/
  for (let i = f - 1; i >= 0; i--) {
    const findPosition = orderGame.find((e) => e.left === c && e.top === i);
    if (findPosition?.piece === '') {
      array.push({
        top: i,
        left: c,
        co: false,
      });
    }
    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: i,
        left: c,
        co: false,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }

  /*verificacion columna izquierda */

  for (let i = c - 1; i >= 0; i--) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);

    if (findPosition?.piece === '') {
      array.push({
        top: f,
        left: i,
        co: false,
      });
    }
    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: f,
        left: i,
        co: false,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }

  /*verificacion columna derecha */

  for (let i = c + 1; i <= 7; i++) {
    const findPosition = orderGame.find((e) => e.left === i && e.top === f);

    if (findPosition?.piece === '') {
      array.push({
        top: f,
        left: i,
        co: false,
      });
    }
    if (findPosition?.piece.includes(nameFriend)) {
      break;
    }
    if (findPosition?.piece.includes(opposite)) {
      array.push({
        top: f,
        left: i,
        co: false,
      });

      if (findPosition.piece.includes(opposite + '-king')) {
        console.log('jaque');
      }
      break;
    }
  }
  return array;
};
