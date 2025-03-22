import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';

export const knightFuture = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const array: RulesPieces[] = [];

  const nameFriend = name.includes('white') ? 'white' : 'black';
  const opposite = name.includes('white') ? 'black' : 'white';

  //console.log(Math.abs(c + positionsValid[0].left));
  //console.log(Math.abs(f + positionsValid[0].top));

  for (const i of positionsValid) {
    const findPost = orderGame.find((e) => e.left === c + i.left && e.top === f + i.top);

    if (findPost && !findPost.piece.includes(nameFriend)) {
      array.push({
        top: findPost.top,
        left: findPost.left,
        co: false,
      });
    }

    if (findPost?.piece.includes(opposite + '-king')) {
      console.log('jaque');
    }
  }

  return array;
};
const positionsValid = [
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
