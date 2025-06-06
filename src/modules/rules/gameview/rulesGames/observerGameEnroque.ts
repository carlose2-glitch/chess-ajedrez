import { ref } from 'vue';

import { orderPieceEnemies } from './orderPiecesEnemies';
import type {
  GameManipulator,
  RulesPieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';
import { observer } from '../gameFuntions/observerGame';

export const observerEnroque = (array: GameManipulator[], p: GameManipulator | undefined) => {
  const colorsEnemys = p?.piece.includes('white') ? 'black' : 'white';
  const findPostCastlingRight = ref<RulesPieces | undefined>(undefined);
  const findPostCastlingRight2 = ref<RulesPieces | undefined>(undefined);
  const findPostCastlingLeft = ref<RulesPieces | undefined>(undefined);
  const findPostCastlingLeft2 = ref<RulesPieces | undefined>(undefined);
  /*adjunta todas los nombres y las posiciones de las piezas enemigas */
  const orderPiece: GameManipulator[] = orderPieceEnemies(array, colorsEnemys);

  /*buscar si hay alguna pieza enemiga poniendo en jaque al rey */
  const positions: RulesPieces[] = observer(orderPiece, colorsEnemys, array);

  const compare = positions.find((e) => e.left === p?.left && e.top === p.top);

  /* Ninguna de las casillas por la que el rey pasara este bajo ataque*/

  //lado derecho
  findPostCastlingRight.value = positions.find((e) => e.left === 5 && e.top === p?.top);
  findPostCastlingRight2.value = positions.find((e) => e.left === 6 && e.top === p?.top);
  //lado izquierdo
  findPostCastlingLeft.value = positions.find((e) => e.left === 3 && e.top === p?.top);
  findPostCastlingLeft2.value = positions.find((e) => e.left === 2 && e.top === p?.top);

  return {
    right: !findPostCastlingRight.value && !findPostCastlingRight2.value ? true : false,
    left: !findPostCastlingLeft.value && !findPostCastlingLeft2.value ? true : false,
    check: compare ? false : true,
    pEnemies: positions,
  };
};
