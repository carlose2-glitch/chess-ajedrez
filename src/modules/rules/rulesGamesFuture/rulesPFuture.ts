import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { bishopFuture } from './bishopFuture';
import { kingFuture } from './kingFuture';
import { knightFuture } from './knightFuture';
import { pawnFuture } from './pawnFuture';
import { queensFuture } from './queensFuture';

import { rookFuture } from './rookFuture';

export const rulesPFuture = (
  name: string | null,
  c: number,
  f: number,
  orderGame: GameManipulator[],
) => {
  const array: RulesPieces[] = [];
  //console.log(name);
  if (name?.includes('pawn')) return pawnFuture(c, f, orderGame, name);
  if (name?.includes('king')) return kingFuture(c, f, orderGame);
  if (name?.includes('rook')) return rookFuture(c, f, orderGame, name);
  if (name?.includes('knight')) return knightFuture(c, f, orderGame, name);
  if (name?.includes('bishop')) return bishopFuture(c, f, orderGame, name);
  if (name?.includes('queen')) return queensFuture(c, f, orderGame, name);
  return array;
};
