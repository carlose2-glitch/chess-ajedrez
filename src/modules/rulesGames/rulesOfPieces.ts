import type { RulesPieces } from '../interfaces/pieces.interface';
import { blackPawns, whitePawns } from './pawns';

export const rulesGames = (name: string | null, c: number, f: number) => {
  const array: RulesPieces[] = [];
  /*peones*/
  if (name?.includes('white-pawn')) return whitePawns(c, f);
  if (name?.includes('black-pawn')) return blackPawns(c, f);

  return array;
};
