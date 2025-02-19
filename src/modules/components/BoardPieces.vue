<template>
  <!-- blacks pieces -->

  <img
    @click="piece()"
    src="../../images/torre-negra.png"
    alt="torre negra"
    class="absolute left-0 w-1/8 cursor-pointer"
    ref="pieces"
  />
  <img
    src="../../images/caballo-negro.png"
    alt="caballo negro"
    class="absolute left-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/alfil-negro.png"
    alt="alfil negro"
    class="absolute left-2/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/Dama-negra.png"
    alt="dama negra"
    class="absolute left-3/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/rey-negro.png"
    alt="rey negro"
    class="absolute left-4/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/alfil-negro.png"
    alt="alfil negro"
    class="absolute left-5/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/caballo-negro.png"
    alt="caballo negro"
    class="absolute left-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/torre-negra.png"
    alt="torre negra"
    class="absolute left-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-0 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-1/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-2/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-3/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-4/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-5/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-6/8 top-1/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-negro.png"
    alt="peon negro"
    class="absolute left-7/8 top-1/8 w-1/8 cursor-pointer"
  />

  <!-- white pieces -->
  <img
    src="../../images/torre-blanca.png"
    alt="torre blanca"
    class="absolute left-0 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/caballo-blanco.png"
    alt="caballo blanco"
    class="absolute left-1/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/alfil-blanco.png"
    alt="alfil blanco"
    class="absolute left-2/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/dama-blanca.png"
    alt="dama blanca"
    class="absolute left-3/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/rey-blanco.png"
    alt="rey blanco"
    class="absolute left-4/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/alfil-blanco.png"
    alt="alfil blanco"
    class="absolute left-5/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/caballo-blanco.png"
    alt="caballo blanco"
    class="absolute left-6/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/torre-blanca.png"
    alt="torre blanca"
    class="absolute left-7/8 top-7/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-0 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-1/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-2/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-3/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-4/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-5/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-6/8 top-6/8 w-1/8 cursor-pointer"
  />
  <img
    src="../../images/peon-blanco.png"
    alt="peon blanco"
    class="absolute left-7/8 top-6/8 w-1/8 cursor-pointer"
  />

  <!-- manipulador de las piezas -->
  <BoardManipulator />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BoardManipulator from './BoardManipulator.vue';

const pieces = ref<HTMLElement | null>(null);

const piece = () => {
  console.log('aqui');
};
</script>
