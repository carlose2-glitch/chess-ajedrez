import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { pawnKingFuture } from '../rulesGames/pawnKingFuture';

import { rulesGames } from '../rulesGames/rulesOfPieces';

export const observer = (
  array: GameManipulator[],
  colorsEnemys: string,
  arrayGame: GameManipulator[],
) => {
  const positionsArray: RulesPieces[] = [];

  const arrayPieces = ['-rook', '-knight', '-bishop', '-queen'];
  const arrayPawnKing = ['-pawn', '-king'];

  for (const sp of arrayPieces) {
    for (const p of array) {
      if (p.piece.includes(colorsEnemys + sp)) {
        const position: RulesPieces[] = rulesGames(p.piece, p.left, p.top, arrayGame);
        if (position.length > 0) {
          for (const i of position) {
            positionsArray.push({
              top: i.top,
              left: i.left,
            });
          }
        }
      }
    }
  }

  for (const sp of arrayPawnKing) {
    for (const p of array) {
      if (p.piece.includes(colorsEnemys + sp)) {
        const position: RulesPieces[] = pawnKingFuture(p.piece, p.left, p.top, arrayGame);
        if (position.length > 0) {
          for (const i of position) {
            positionsArray.push({
              top: i.top,
              left: i.left,
            });
          }
        }
      }
    }
  }
  return positionsArray;
};
