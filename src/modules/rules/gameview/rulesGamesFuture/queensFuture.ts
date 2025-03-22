import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';
import { rookFuture } from './rookFuture';
import { bishopFuture } from './bishopFuture';

export const queensFuture = (c: number, f: number, orderGame: GameManipulator[], name: string) => {
  const arrayp: RulesPieces[] = [];

  const array1 = rookFuture(c, f, orderGame, name);
  const array2 = bishopFuture(c, f, orderGame, name);
  const array: RulesPieces[] = arrayp.concat(array1, array2);
  return array;
};
