import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { kingFuture } from './kingFuture';
import { pawnFuture } from './pawnFuture';

export const pawnKingFuture = (
  name: string,
  c: number,
  f: number,
  orderGame: GameManipulator[],
) => {
  const array: RulesPieces[] = [];

  if (name.includes('pawn')) return pawnFuture(c, f, orderGame, name);
  if (name.includes('king')) return kingFuture(c, f, orderGame);

  return array;
};
