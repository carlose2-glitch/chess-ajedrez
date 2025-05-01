<template>
  <div>
    <div v-bind:class="classP">
      <img
        :src="'/src/images/' + bishop"
        class="w-1/8 cursor-pointer"
        alt="alfil"
        @click="choosePieceCoronation(bishop)"
      />
      <img
        :src="'/src/images/' + horse"
        class="w-1/8 cursor-pointer"
        alt="caballo"
        @click="choosePieceCoronation(horse)"
      />
      <img
        :src="'/src/images/' + rook"
        class="w-1/8 cursor-pointer"
        alt="torre"
        @click="choosePieceCoronation(rook)"
      />
      <img
        :src="'/src/images/' + queen"
        class="w-1/8 cursor-pointer"
        alt="reyna"
        @click="choosePieceCoronation(queen)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CoronationDatai } from '@/modules/interfaces/gamefuntions/pieces.interface';
import { ref } from 'vue';

const data = defineProps<CoronationDatai>();

const bishop = ref<string | null>(null);
const horse = ref<string | null>(null);
const rook = ref<string | null>(null);
const queen = ref<string | null>(null);
const classP = ref<string | null>(null);

const dataPiecesSrc = [
  {
    bishop: 'alfil-blanco.png',
    horse: 'caballo-blanco.png',
    rook: 'torre-blanca.png',
    queen: 'dama-blanca.png',
  },
  {
    bishop: 'alfil-negro.png',
    horse: 'caballo-negro.png',
    rook: 'torre-negra.png',
    queen: 'Dama-negra.png',
  },
];

if (data.r === 0) {
  /*piezas blancas */
  bishop.value = dataPiecesSrc[0].bishop;
  horse.value = dataPiecesSrc[0].horse;
  rook.value = dataPiecesSrc[0].rook;
  queen.value = dataPiecesSrc[0].queen;
  classP.value = 'absolute left-0/8 top-0/8 flex justify-center w-8/8 h-1/8 bg-gray-500/70';
} else if (data.r === 7) {
  /*piezas negras */
  bishop.value = dataPiecesSrc[1].bishop;
  horse.value = dataPiecesSrc[1].horse;
  rook.value = dataPiecesSrc[1].rook;
  queen.value = dataPiecesSrc[1].queen;
  classP.value = 'absolute left-0/8 top-7/8 flex justify-center w-8/8 h-1/8 bg-gray-500/70';
}
const emits = defineEmits<{
  selectPiece: [p: string | null];
}>();
console.log(data.r);
const choosePieceCoronation = (name: string | null) => {
  emits('selectPiece', name);
};
</script>
