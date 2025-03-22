import type {
  GameManipulator,
  RulesPieces,
} from '../../../interfaces/gamefuntions/pieces.interface';
import { bishops } from './bishop';
import { kings } from './kings';
import { Knights } from './knights';
import { blackPawns, whitePawns } from './pawns';
import { queen } from './queens';
import { whiteBlackRooks } from './rooks';

export const rulesGames = (
  name: string | null,
  c: number,
  f: number,
  orderGame: GameManipulator[],
) => {
  const array: RulesPieces[] = [];
  /*peones*/
  if (name?.includes('white-pawn')) return whitePawns(c, f, orderGame);
  if (name?.includes('black-pawn')) return blackPawns(c, f, orderGame);
  /*torres blancas y negras */
  if (name?.includes('rook')) return whiteBlackRooks(c, f, orderGame, name);
  /*caballos blancos y negros */
  if (name?.includes('knight')) return Knights(c, f, orderGame, name);
  /*alfil blanco y negro */
  if (name?.includes('bishop')) return bishops(c, f, orderGame, name);
  /*dama blanca y negra */
  if (name?.includes('queen')) return queen(c, f, orderGame, name);
  /*rey blanco y negro */
  if (name?.includes('king')) return kings(c, f, orderGame, name);
  return array;
};
