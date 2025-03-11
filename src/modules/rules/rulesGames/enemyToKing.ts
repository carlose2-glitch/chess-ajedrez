import type { GameManipulator, RulesPieces } from '../../interfaces/pieces.interface';
import { orderPieceEnemies } from './orderPiecesEnemies';
import { observer } from '../../pieces-board/observerGame';

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

  const colorEnemy = piec?.piece.includes('white') ? 'black' : 'white';
  const colorFriend = piec?.piece.includes('white') ? 'white' : 'black';
  /*verifica si en el movimiento final esta disponible */
  const movement = array.find((e) => e.left === cf && e.top === ff && e.piece === '');
  // const movementP = array.find(
  //   (e) => e.left === cf && e.top === ff && e.piece.includes(colorEnemy),
  // );
  const movementE = array.find(
    (e) => e.left === cf && e.top === ff && e.piece.includes(colorEnemy),
  );
  const movementF = array.find(
    (e) => e.left === cf && e.top === ff && e.piece.includes(colorFriend),
  );

  if (movement && piec) {
    const newArray = order(piec, movement, array);
    const color = piec.piece.includes('white') ? 'black' : 'white';
    const arrayEnemy = orderPieceEnemies(newArray, color);
    console.log(1 + 'vacio');
    //console.log(newArray);
    //console.log(piec);
    const positions: RulesPieces[] = observer(arrayEnemy, color, newArray);

    /*detecta si el rey esta en jaque con este movimiento */
    positions.find((e) => {
      if (e.left === king?.left && e.top === king.top) {
        return (decision.d = false);
      }
    });
  } else if (movementE && piec) {
    // console.log(2 + 'enemy');
    const newArray = order(piec, movementE, array);
    const color = piec.piece.includes('white') ? 'black' : 'white';
    const arrayEnemy = orderPieceEnemies(newArray, color);

    const positions: RulesPieces[] = observer(arrayEnemy, color, newArray);

    /*detecta si el rey esta en jaque con este movimiento */
    positions.find((e) => {
      if (e.left === king?.left && e.top === king.top) {
        return (decision.d = false);
      }
    });
  } else if (movementF && piec) {
    const newArray = order(piec, movementF, array);
    //    console.log(3 + 'friend');

    const color = piec.piece.includes('white') ? 'black' : 'white';
    const arrayEnemy = orderPieceEnemies(newArray, color);
    const positions: RulesPieces[] = observer(arrayEnemy, color, newArray);

    /*detecta si el rey esta en jaque con este movimiento */
    positions.find((e) => {
      if (e.left === king?.left && e.top === king.top) {
        return (decision.d = false);
      }
    });
  }
  //  console.log(decision.d);
  return decision.d;
};

const order = (p: GameManipulator, m: GameManipulator, a: GameManipulator[]) => {
  const array: GameManipulator[] = [];

  const enemyColor = p.piece.includes('white') ? 'black' : 'white';

  for (const order of a) {
    if (order.left === p.left && order.top === p.top) {
      array.push({
        piece: '',
        left: order.left,
        top: order.top,
        movements: order.movements,
      });
    } else if (order.left === m.left && order.top === m.top && order.piece.includes(enemyColor)) {
      array.push({
        piece: p.piece,
        left: order.left,
        top: order.top,
        movements: order.movements,
      });
    } else if (order.left === m.left && order.top === m.top && order.piece === '') {
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
