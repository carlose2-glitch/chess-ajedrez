<template>
  <div v-for="p in paintings" v-bind:class="p.classs" v-bind:key="p.left"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Measures {
  column: string | null;
  row: string | null;
  screen: string | null;
  pieces: string | null;
}

interface Paintings {
  classs: string;
  top: number;
  left: number;
}
/*ejemplo de como usar los props */
const data = defineProps<Measures>();

const funtionPaintins = () => {
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

const paintings = ref<Paintings[]>(funtionPaintins());

watch(data, (e) => {
  paintings.value = funtionPaintins();

  const column = Number(e.column);
  const row = Number(e.row);
  /*Posicion de la pieza en la cual se va a colorear */
  const position = paintings.value.findIndex((e) => e.left === column && e.top === row);
  /*seleccionar pieza */
  paintings.value[position].classs =
    `absolute left-${column}/8 top-${row}/8 w-1/8 h-1/8 cursor-pointer bg-green-400/30`;
});
</script>
