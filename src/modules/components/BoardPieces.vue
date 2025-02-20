<template>
  <!-- pieces -->

  <img
    v-for="p in extractPositionPieces"
    v-bind:key="p.name"
    @click="choosePiece(p.name)"
    :src="'/src/images/' + p.src"
    :alt="p.name"
    :class="classStylePiece(p.left, p.top)"
  />

  <!-- manipulador de las piezas -->
</template>

<script lang="ts" setup>
import type { Pieces } from '../interfaces/pieces.interface';
import { piecesManipulator } from '../pieces-board/pieces';

const extractPositionPieces: Pieces[] = piecesManipulator().pieces;

const choosePiece = (piece: string) => {
  console.log(piece);
};

const classStylePiece = (left: string, top: string) => {
  return `absolute left-${left} top-${top} w-1/8 cursor-pointer`;
};
</script>
