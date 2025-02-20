<template>
  <img
    src="../../images/Tablero de Ajedrez_.png"
    class="w-full absolute opacity-10"
    alt="tablero"
    ref="manipulatorTable"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const manipulatorTable = ref<HTMLElement | null>(null);

onMounted(() => manipulatorTable.value?.addEventListener('click', tablero));

const emits = defineEmits<{
  positions: [column: number, row: number];
}>();

const tablero = (e: unknown) => {
  /*evento del mouse para capturar ña posicion */
  const y = e.layerY;
  const x = e.layerX;

  /*tamaño del tablero */
  const heightScreen = e.target.clientHeight;
  /* calculo de la posicion*/

  const fila = Math.floor((y * 8) / heightScreen);
  const columna = Math.floor((x * 8) / heightScreen);

  emits('positions', columna, fila);
};
</script>
