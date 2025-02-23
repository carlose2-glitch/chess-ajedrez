import { computed, ref } from 'vue';
import type { Paintings } from '../interfaces/pieces.interface';

export const funtionPaintins = () => {
  const array = ref<Paintings[]>(charts());

  const reload = () => {
    array.value = charts();
  };
  const paint = (p: number, c: number | null, r: number | null) => {
    array.value[p].classs =
      `absolute left-${c}/8 top-${r}/8 w-1/8 h-1/8 cursor-pointer bg-green-400/30`;
  };

  return {
    array: computed(() => [...array.value]),
    reload,
    paint,
  };
};

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
