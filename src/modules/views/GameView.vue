<template>
  <div class="flex flex-col bg-gray-500">
    <EndGame v-if="final" @close="closeModal" :color="colorWin" />
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="bg-gray-700 w-[90%]">
        <div class="flex flex-col m-auto items-center bg-gray-400 max-w-[32rem]">
          <PlayerBar1 />

          <BoardView v-bind:class="changeTurn" @final="checkMate" :change="grados" />

          <PlayerBar2 />
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
import PlayerBar1 from '../components/PlayerBar1.vue';
import PlayerBar2 from '../components/PlayerBar2.vue';

const grados = ref<number>(0);
const changeTurn = ref<string>(`rotate-${grados.value}`);
const final = ref<boolean>(false);
const colorWin = ref<string | null>(null);

const checkMate = (f: boolean, color: string | null) => {
  colorWin.value = color;
  final.value = f;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        grados.value = 180;

        changeTurn.value = `rotate-180 duration-700`;
      } else {
        grados.value = 360;

        changeTurn.value = `rotate-360 duration-700`;
      }
    }, 1000);
  }
};

const closeModal = (d: boolean) => {
  final.value = d;
};
</script>
