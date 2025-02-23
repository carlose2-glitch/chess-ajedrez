<template>
  <div
    v-for="p in data.paintings"
    v-bind:class="p.classs"
    @click="movementPiece(p.left, p.top)"
    v-bind:key="p.left"
  ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Measures } from '../interfaces/pieces.interface';

const firstRow = ref<number | null>(null);
const firstColumn = ref<number | null>(null);

/*ejemplo de como usar los props */
const data = defineProps<Measures>();

const movementPiece = (c: number, f: number) => {
  console.log(firstColumn.value, firstRow.value);
  console.log(c, f);
};
</script>
