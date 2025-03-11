import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

export const Knights = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const nameFriend = name.includes('white') ? 'white' : 'black';
  const opposite = name.includes('white') ? 'black' : 'white';

  //console.log(Math.abs(c + positionsValid[0].left));
  //console.log(Math.abs(f + positionsValid[0].top));
  const miKing = orderGame.find((e) => e.piece === nameFriend + '-king');

  for (const i of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + i.left && e.top === f + i.top);
    const post = enemyToKing(c + i.left, f + i.top, c, f, orderGame, miKing);
    if (findPost && !findPost.piece.includes(nameFriend) && post) {
      array.push({
        top: findPost.top,
        left: findPost.left,
      });
    }

    if (findPost?.piece.includes(opposite + '-king')) {
      console.log('jaque');
    }
  }

  return array;
};

const positionsValid: RulesPieces[] = [
  {
    top: -2,
    left: -1,
  },
  {
    top: -2,
    left: 1,
  },
  {
    top: -1,
    left: -2,
  },
  {
    top: -1,
    left: 2,
  },
  {
    top: 1,
    left: -2,
  },
  {
    top: 2,
    left: -1,
  },
  {
    top: 1,
    left: 2,
  },
  {
    top: 2,
    left: 1,
  },
];
