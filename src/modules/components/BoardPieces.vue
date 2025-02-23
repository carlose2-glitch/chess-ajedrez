<template>
  <!-- pieces -->

  <img
    v-for="p in data.extractPositionPieces"
    v-bind:key="p.name"
    @click="choosePiece(p.name, p.class)"
    :src="'/src/images/' + p.src"
    :alt="p.name"
    :class="p.class"
  />
</template>

<script lang="ts" setup>
import type { Pieces } from '../interfaces/pieces.interface';

interface ArrayPieces {
  extractPositionPieces: Pieces[];
}

const data = defineProps<ArrayPieces>();

const emits = defineEmits<{
  information: [piece: string, column: number, row: number];
}>();

const choosePiece = (piece: string, clas: string) => {
  /*extraccion de la posicion de la fila y columna del tablero */
  const column = Number(clas.slice(14, -31));
  const row = Number(clas.slice(22, -23));
  /*const column = Number(left.slice(0, -2));*/
  /* const row = Number(top.slice(0, -2));*/

  emits('information', piece, column, row);
};
</script>
