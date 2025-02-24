<template>
  <!-- pieces -->

  <img
    v-for="p in data.extractPositionPieces"
    v-bind:key="p.name"
    @click="choosePiece(p.name, p.left, p.top)"
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

const choosePiece = (piece: string, left: string, top: string) => {
  /*extraccion de la posicion de la fila y columna del tablero */
  const column = Number(left.slice(0, 1));
  const row = Number(top.slice(0, 1));
  /*const column = Number(left.slice(0, -2));*/
  /* const row = Number(top.slice(0, -2));*/

  emits('information', piece, column, row);
};
</script>
