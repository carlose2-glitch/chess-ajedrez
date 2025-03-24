<template>
  <div class="flex flex-col bg-gray-700 gap-0.5">
    <EndGame v-if="final" @close="closeModal" :color="colorWin" />
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="w-[90%]">
        <div v-bind:class="changeTurn">
          <PlayerBlack
            v-bind:class="flip"
            :run="blackTurn"
            :time="timeGame"
            @information="finalGame"
            :enemies="whiteEnemies"
          />

          <BoardView @final="checkMate" :change="grados" />

          <PlayerWhite
            v-bind:class="flip"
            :run="whiteTurn"
            :time="timeGame"
            @information="finalGame"
            :enemies="blackEnemies"
          />
        </div>
      </div>
    </main>

    <ModalSelect @close-e="controlTime" />
  </div>
</template>

<script lang="ts" setup>
import HeaderView from '../components/gameview/HeaderView.vue';

import { ref } from 'vue';
import PlayerBlack from '../components/gameview/PlayerBlack.vue';
import PlayerWhite from '../components/gameview/PlayerWhite.vue';
import BoardView from '../components/gameview/view/BoardView.vue';
import EndGame from '../components/gameview/view/EndGame.vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';
import ModalSelect from '../components/home/ModalSelect.vue';

const timeGame = ref<string>('5');

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const grados = ref<number>(0);
const changeTurn = ref<string>(
  `rotate-${grados.value} flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`,
);
const final = ref<boolean>(false);
const colorWin = ref<string | null>(null);
const flip = ref<string>('rotate-0');

const whiteTurn = ref<boolean>(false);
const blackTurn = ref<boolean>(false);

const checkMate = (f: boolean, color: string | null, deletes: deletePiece[]) => {
  whiteEnemies.value = deletes.filter((e) => e.name?.includes('white'));
  blackEnemies.value = deletes.filter((e) => e.name?.includes('black'));
  colorWin.value = color;
  final.value = f;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        grados.value = 180;
        flip.value = 'rotate-180';
        changeTurn.value = `rotate-180 duration-700 flex flex-col m-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`;
        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        grados.value = 360;
        flip.value = 'rotate-360';
        changeTurn.value = `rotate-360 duration-700 flex flex-col m-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`;
        whiteTurn.value = true;
        blackTurn.value = false;
      }
    }, 1000);
  }
};

const closeModal = (d: boolean) => {
  final.value = d;
};

const finalGame = (f: boolean, c: string) => {
  final.value = f;
  colorWin.value = c;
};
const controlTime = (t: string, r: boolean) => {
  timeGame.value = t;
  whiteTurn.value = r;
};
</script>
