import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { bishops } from './bishop';
import { whiteBlackRooks } from './rooks';

export const queen = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const arrayp: RulesPieces[] = [];

  const array1 = whiteBlackRooks(c, f, orderGame, name);
  const array2 = bishops(c, f, orderGame, name);
  const array: RulesPieces[] = arrayp.concat(array1, array2);
  return array;
};
