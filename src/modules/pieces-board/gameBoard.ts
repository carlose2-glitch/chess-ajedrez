import { computed, ref } from 'vue';
import type { GameManipulator } from '../interfaces/pieces.interface';
import { piecesManipulator } from './pieces';

export const game = () => {
  const arrayGame = ref<GameManipulator[]>(array());

  return {
    array: computed(() => [...arrayGame.value]),
  };
};

/*comienzo del juego */
const array = () => {
  const order: GameManipulator[] = [];

  const pieces = piecesManipulator().pieces.value;

  for (let f = 0; f < 8; f++) {
    for (let c = 0; c < 8; c++) {
      /* evalua si la posicion de la fila y la columna se encuentra una pieza */
      const r = pieces.find((p) => {
        if (Number(p.top.slice(0, 1)) === f && Number(p.left.slice(0, 1)) === c) {
          return p.name;
        }
      });

      if (r) {
        order.push({
          piece: r.name,
          left: c,
          top: f,
        });
      } else {
        order.push({
          piece: '',
          left: c,
          top: f,
        });
      }
    }
  }

  return order;
};
