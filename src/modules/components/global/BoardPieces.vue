<template>
  <!-- pieces -->

  <img
    v-for="p in data.extractPositionPieces"
    v-bind:key="p.name"
    @click="choosePiece(p.name, p.left, p.top)"
    :src="'/img/' + p.src"
    :alt="p.name"
    :class="p.class"
  />
</template>

<script lang="ts" setup>
import type { Pieces } from '@/modules/interfaces/gamefuntions/pieces.interface';

interface ArrayPieces {
  extractPositionPieces: Pieces[];
  turn: string[];
  movements: number;
}

const data = defineProps<ArrayPieces>();

const emits = defineEmits<{
  information: [piece: string, column: number, row: number];
}>();

const choosePiece = (piece: string, left: string, top: string) => {
  /*extraccion de la posicion de la fila y columna del tablero */
  const column = Number(left.slice(0, 1));
  const row = Number(top.slice(0, 1));

  if (piece.includes(data.turn[data.movements % 2])) {
    emits('information', piece, column, row);
  }
};
</script>
