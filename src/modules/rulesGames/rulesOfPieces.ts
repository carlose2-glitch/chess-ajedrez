import { whitePawns } from './pawns';

export const rulesGames = (name: string | null, c: number, f: number) => {
  if (name?.includes('pawn')) {
    return whitePawns(c, f);
  }
};
