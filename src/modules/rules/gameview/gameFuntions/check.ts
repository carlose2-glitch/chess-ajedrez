import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';

import { orderPieceEnemies } from '../rulesGames/orderPiecesEnemies';
import { rulesGames } from '../rulesGames/rulesOfPieces';

export const check = (orderGame: GameManipulator[], piece: string | null) => {
  const array: RulesPieces[] = [];
  const color = piece?.includes('white') ? 'black' : 'white';
  const arrayEnemy = orderPieceEnemies(orderGame, color);

  for (const p of arrayEnemy) {
    const position = rulesGames(p.piece, p.left, p.top, orderGame);
    if (position.length > 0) {
      for (const i of position) {
        array.push({
          top: i.top,
          left: i.left,
          co: i.co,
        });
      }
    }
  }

  return array.length > 0 ? false : true;
};
