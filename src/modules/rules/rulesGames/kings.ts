import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';

import { observerEnroque } from './observerGameEnroque';
import { positionKing } from './positionKing';

export const kings = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];
  const nameFriend = name.includes('white') ? 'white' : 'black';

  const king = orderGame.find((e) => e.piece === name);
  /*torre amiga 1 */
  const rook1 = orderGame.find((e) => nameFriend + '-rook1' === e.piece && e.movements === 0);

  /*torre amiga 2 */

  const rook2 = orderGame.find((e) => nameFriend + '-rook2' === e.piece && e.movements === 0);

  /*observador que ninguna pieza la este poniendo en jaque */
  const { right, left, check, pEnemies } = observerEnroque(orderGame, king);

  /* enroque rey*/
  /* enroque izquierda*/
  if (king?.movements === 0 && rook1 && check && left) {
    const savePost: RulesPieces[] = [];
    for (let i = 1; i <= 3; i++) {
      const findPost = orderGame.find((e) => e.left === c - i && e.top === f);

      if (findPost?.piece !== '') {
        break;
      }
      savePost.push({
        top: findPost.top,
        left: findPost.left,
        co: false,
      });
      if (i === 3) {
        array.push(
          {
            top: savePost[0].top,
            left: savePost[0].left,
            co: false,
          },
          {
            top: savePost[1].top,
            left: savePost[1].left,
            co: false,
          },
        );
      }
    }
  }
  /*enroque derecha */
  if (king?.movements === 0 && rook2 && check && right) {
    const savePost: RulesPieces[] = [];
    for (let i = 1; i <= 2; i++) {
      const findPost = orderGame.find((e) => e.left === c + i && e.top === f);

      if (findPost?.piece !== '') {
        break;
      }
      savePost.push({
        top: findPost.top,
        left: findPost.left,
        co: false,
      });

      if (i === 2) {
        array.push(
          {
            top: savePost[0].top,
            left: savePost[0].left,
            co: false,
          },
          {
            top: savePost[1].top,
            left: savePost[1].left,
            co: false,
          },
        );
      }
    }
  }

  /*evalua las posiciones del arreglo */
  for (const p of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + p.left && e.top === f + p.top);
    const findPostEnemy = pEnemies.find((e) => e.left === c + p.left && e.top === f + p.top);

    const isNotcheck = positionKing(king, c + p.left, f + p.top, c, f, orderGame);

    /*evalua si no hay un enemigo en la posicion */
    if (findPost && !findPost.piece.includes(nameFriend) && !findPostEnemy && isNotcheck) {
      array.push({
        top: findPost.top,
        left: findPost.left,
        co: false,
      });
    }
  }
  return array;
};

const positionsValid = [
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
