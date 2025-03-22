<template>
  <div class="flex flex-col bg-gray-500">
    <EndGame v-if="final" @close="closeModal" :color="colorWin" />
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="bg-gray-700 w-[90%]">
        <div v-bind:class="changeTurn">
          <PlayerBlack
            v-bind:class="flip"
            :run="blackTurn"
            @information="finalGame"
            :enemies="whiteEnemies"
          />

          <BoardView @final="checkMate" :change="grados" />

          <PlayerWhite
            v-bind:class="flip"
            :run="whiteTurn"
            @information="finalGame"
            :enemies="blackEnemies"
          />
        </div>
      </div>
    </main>

    <div class="flex flex-col w-full h-auto">
      <TimeOptions />
      <ButtonPlay />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonPlay from '../components/gameview/ButtonPlay.vue';
import HeaderView from '../components/gameview/HeaderView.vue';

import TimeOptions from '../components/gameview/TimeOptions.vue';

import { ref } from 'vue';
import PlayerBlack from '../components/gameview/PlayerBlack.vue';
import PlayerWhite from '../components/gameview/PlayerWhite.vue';
import BoardView from '../components/gameview/view/BoardView.vue';
import EndGame from '../components/gameview/view/EndGame.vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const grados = ref<number>(0);
const changeTurn = ref<string>(
  `rotate-${grados.value} flex flex-col m-auto h-auto items-center bg-gray-400 max-w-[32rem] gap-0.5`,
);
const final = ref<boolean>(false);
const colorWin = ref<string | null>(null);
const flip = ref<string>('rotate-0');

const whiteTurn = ref<boolean>(true);
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
        changeTurn.value = `rotate-180 duration-700 flex flex-col m-auto items-center bg-gray-400 max-w-[32rem] gap-0.5`;
        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        grados.value = 360;
        flip.value = 'rotate-360';
        changeTurn.value = `rotate-360 duration-700 flex flex-col m-auto items-center bg-gray-400 max-w-[32rem] gap-0.5`;
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
</script>
