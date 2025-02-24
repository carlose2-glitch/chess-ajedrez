import { computed, ref } from 'vue';
import type { GameManipulator, Pieces } from '../interfaces/pieces.interface';

export const game = (order: Pieces[]) => {
  const arrayGame = ref<GameManipulator[]>(array(order));

  const gameManipulator = (gameModify: Pieces[]) => {
    arrayGame.value = array(gameModify);
  };

  return {
    array: computed(() => [...arrayGame.value]),
    gameManipulator,
  };
};

/*comienzo del juego y reconstruccion de los sucesos del juego*/
const array = (o: Pieces[]) => {
  const order: GameManipulator[] = [];

  const pieces = o;

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
