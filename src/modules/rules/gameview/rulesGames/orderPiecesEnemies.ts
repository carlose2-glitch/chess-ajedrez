import type { GameManipulator } from '../../../interfaces/gamefuntions/pieces.interface';

export const orderPieceEnemies = (a: GameManipulator[], ce: string) => {
  const array: GameManipulator[] = [];

  for (const search of a) {
    if (search.piece.includes(ce)) {
      array.push({
        piece: search.piece,
        left: search.left,
        top: search.top,
        movements: search.movements,
      });
    }
  }
  return array;
};
