import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';
import { rulesPFuture } from '../rulesGamesFuture/rulesPFuture';

//import { rulesGames } from '../rules/rulesGames/rulesOfPieces';

export const observer = (
  array: GameManipulator[],
  colorsEnemys: string,
  arrayGame: GameManipulator[],
) => {
  const positionsArray: RulesPieces[] = [];

  const arrayPiecesF = ['-pawn', '-king', '-rook', '-knight', '-bishop', '-queen'];

  for (const sp of arrayPiecesF) {
    for (const p of array) {
      if (p.piece.includes(colorsEnemys + sp)) {
        const position: RulesPieces[] = rulesPFuture(p.piece, p.left, p.top, arrayGame);
        if (position.length > 0) {
          for (const i of position) {
            positionsArray.push({
              top: i.top,
              left: i.left,
              co: i.co,
            });
          }
        }
      }
    }
  }
  return positionsArray;
};
