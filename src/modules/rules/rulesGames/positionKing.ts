import type { GameManipulator } from '@/modules/interfaces/pieces.interface';
import { enemyToKing } from './enemyToKing';

export const positionKing = (
  king: GameManipulator | undefined,
  cf: number,
  ff: number,
  c: number,
  f: number,
  orderGame: GameManipulator[],
) => {
  if (king) {
    const newKing = {
      piece: king.piece,
      left: cf,
      top: ff,
      movements: king.movements,
    };
    return enemyToKing(cf, ff, c, f, orderGame, newKing);
  }
};
