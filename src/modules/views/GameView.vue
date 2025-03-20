<template>
  <div class="flex flex-col bg-gray-500">
    <EndGame v-if="final" @close="closeModal" :color="colorWin" />
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="bg-gray-700 w-[90%]">
        <div v-bind:class="changeTurn">
          <PlayerBlack v-bind:class="flip" :run="blackTurn" @information="finalGame" />

          <BoardView @final="checkMate" :change="grados" />

          <PlayerWhite v-bind:class="flip" :run="whiteTurn" @information="finalGame" />
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
import BoardView from '../components/view/BoardView.vue';
import ButtonPlay from '../components/ButtonPlay.vue';
import HeaderView from '../components/HeaderView.vue';

import TimeOptions from '../components/TimeOptions.vue';
import EndGame from '../components/view/EndGame.vue';
import { ref } from 'vue';
import PlayerBlack from '../components/PlayerBlack.vue';
import PlayerWhite from '../components/PlayerWhite.vue';

const grados = ref<number>(0);
const changeTurn = ref<string>(
  `rotate-${grados.value} flex flex-col m-auto h-auto items-center bg-gray-400 max-w-[32rem] gap-0.5`,
);
const final = ref<boolean>(false);
const colorWin = ref<string | null>(null);
const flip = ref<string>('rotate-0 duration-700');

const whiteTurn = ref<boolean>(true);
const blackTurn = ref<boolean>(false);

const checkMate = (f: boolean, color: string | null) => {
  colorWin.value = color;
  final.value = f;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        grados.value = 180;
        flip.value = 'rotate-180 duration-700';
        changeTurn.value = `rotate-180 duration-700 flex flex-col m-auto items-center bg-gray-400 max-w-[32rem] gap-0.5`;
        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        grados.value = 360;
        flip.value = 'rotate-360 duration-700';
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
