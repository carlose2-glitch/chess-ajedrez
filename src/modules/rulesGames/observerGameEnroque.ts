import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { observer } from '../pieces-board/observerGame';

export const observerEnroque = (array: GameManipulator[], p: GameManipulator | undefined) => {
  const colorsEnemys = p?.piece.includes('white') ? 'black' : 'white';
  /*adjunta todas los nombres y las posiciones de las piezas enemigas */
  const orderPiece: GameManipulator[] = [];
  for (const search of array) {
    if (search.piece.includes(colorsEnemys)) {
      orderPiece.push({
        piece: search.piece,
        left: search.left,
        top: search.top,
        movements: search.movements,
      });
    }
  }

  /*buscar si hay alguna pieza enemiga poniendo en jaque al rey */
  const positions: RulesPieces[] = observer(orderPiece, colorsEnemys, array);

  const compare = positions.find((e) => e.left === p?.left && e.top === p.top);

  return compare ? false : true;
};
