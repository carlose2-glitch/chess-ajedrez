import { computed, ref } from 'vue';
import type { Paintings, RulesPieces } from '../interfaces/pieces.interface';

export const funtionPaintins = () => {
  const array = ref<Paintings[]>(charts());
  /*colocar todos los cuadros transparentes */
  const reload = () => {
    array.value = charts();
  };
  /* seleccionar pieza */
  const paint = (p: number, c: number | null, r: number | null) => {
    array.value[p].classs =
      `absolute left-${c}/8 top-${r}/8 w-1/8 h-1/8 cursor-pointer bg-green-400/30`;
  };

  /* pintar cuadros disponibles en la cual se puede mover*/

  const paintingsAvailable = (paint: RulesPieces[]) => {
    for (const p of paint) {
      array.value.find((e, i) => {
        if (e.left === p.left && e.top === p.top) {
          array.value[i].classs =
            `absolute left-${e.left}/8 top-${e.top}/8 w-1/8 h-1/8 cursor-pointer bg-green-800/50`;
        }
      });
    }
  };

  return {
    array: computed(() => [...array.value]),
    reload,
    paint,
    paintingsAvailable,
  };
};

/*reiniciar los cuadros a transparentes */

const charts = () => {
  const array: Paintings[] = [];

  for (let f = 0; f < 8; f++) {
    for (let c = 0; c < 8; c++) {
      array.push({
        classs: `absolute left-${c}/8 top-${f}/8 w-1/8 h-1/8 cursor-pointer bg-green-400/20 -z-10`,
        top: f,
        left: c,
      });
    }
  }

  return array;
};
