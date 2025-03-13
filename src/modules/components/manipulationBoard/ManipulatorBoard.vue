<template>
  <div
    v-for="p in data.paintings"
    v-bind:class="p.classs"
    @click="movementPiece(p.left, p.top)"
    v-bind:key="p.left"
  ></div>
</template>

<script lang="ts" setup>
import type { Measures } from '../../interfaces/pieces.interface';

const emits = defineEmits<{
  secondMovement: [firstColum: number, firstRow: number, piece: string | null];
}>();

/*datos de la primera columna y fila */
const data = defineProps<Measures>();

const movementPiece = (c: number, f: number) => {
  if (data.column !== c || data.row !== f) {
    emits('secondMovement', c, f, data.pieces);
  }
};
</script>
