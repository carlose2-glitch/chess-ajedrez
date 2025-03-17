<template>
  <div class="flex flex-col bg-gray-500">
    <EndGame v-if="final" @close="closeModal" />
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="bg-gray-700 w-[90%]">
        <div class="flex flex-col m-auto items-center bg-gray-400 max-w-[32rem]">
          <PlayerBar />

          <BoardView @final="checkMate" />

          <PlayerBar />
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
import PlayerBar from '../components/PlayerBar.vue';
import TimeOptions from '../components/TimeOptions.vue';
import EndGame from '../components/view/EndGame.vue';
import { ref } from 'vue';

const final = ref<boolean>(false);

const checkMate = (f: boolean) => {
  final.value = f;
};

const closeModal = (d: boolean) => {
  final.value = d;
};
</script>
