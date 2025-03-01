import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';

export const kings = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];
  const nameFriend = name.includes('white') ? 'white' : 'black';

  /* enroque rey*/
  const king = orderGame.find((e) => e.piece === name);
  /*torre amiga 1 */
  const rook1 = orderGame.find((e) => nameFriend + '-rook1' === e.piece && e.movements === 0);

  /*torre amiga 2 */

  const rook2 = orderGame.find((e) => nameFriend + '-rook2' === e.piece && e.movements === 0);

  if (king?.movements === 0 && rook1) {
    console.log('enroque torre 1');
  }
  if (king?.movements === 0 && rook2) {
    console.log('enroque torre 2');
  }

  if (king?.movements === 0) {
  }

  /*evalua las posiciones del arreglo */
  for (const p of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + p.left && e.top === f + p.top);

    if (findPost && !findPost.piece.includes(nameFriend)) {
      array.push({
        top: findPost.top,
        left: findPost.left,
      });
    }
  }
  return array;
};

const positionsValid: RulesPieces[] = [
  {
    top: -1,
    left: -1,
  },
  {
    top: -1,
    left: 0,
  },
  {
    top: -1,
    left: 1,
  },
  {
    top: 0,
    left: 1,
  },
  {
    top: 1,
    left: 1,
  },
  {
    top: 1,
    left: 0,
  },
  {
    top: 1,
    left: -1,
  },
  {
    top: 0,
    left: -1,
  },
];
