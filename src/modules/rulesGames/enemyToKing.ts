import type { GameManipulator, RulesPieces } from '../interfaces/pieces.interface';
import { orderPieceEnemies } from './orderPiecesEnemies';
import { observer } from '../pieces-board/observerGame';

export const enemyToKing = (
  cf: number,
  ff: number,
  c: number,
  f: number,
  Game: GameManipulator[],
  king: GameManipulator | undefined,
) => {
  const decision = {
    d: true,
  };

  const array: GameManipulator[] = Game;
  /*encuentra la pieza */
  const piec = array.find((e) => e.left === c && e.top === f);
  /*verifica si en el movimiento final esta disponible */
  const movement = array.find((e) => e.left === cf && e.top === ff && e.piece === '');

  if (movement && piec) {
    const newArray = order(piec, movement, array);

    const color = piec.piece.includes('white') ? 'black' : 'white';
    const arrayEnemy = orderPieceEnemies(array, color);
    const positions: RulesPieces[] = observer(arrayEnemy, color, newArray);

    //console.log(positions);
    //console.log(king);

    positions.find((e) => {
      if (e.left === king?.left && e.top === king.top) {
        return (decision.d = false);
      }
    });
  }

  return decision.d;
};

const order = (p: GameManipulator, m: GameManipulator, a: GameManipulator[]) => {
  const array: GameManipulator[] = [];

  for (const order of a) {
    if (order.left === p.left && order.top === p.top) {
      array.push({
        piece: '',
        left: order.left,
        top: order.top,
        movements: order.movements,
      });
    } else if (order.left === m.left && order.top === m.top) {
      array.push({
        piece: p.piece,
        left: order.left,
        top: order.top,
        movements: order.movements,
      });
    } else {
      array.push({
        piece: order.piece,
        left: order.left,
        top: order.top,
        movements: order.movements,
      });
    }
  }
  return array;
};
