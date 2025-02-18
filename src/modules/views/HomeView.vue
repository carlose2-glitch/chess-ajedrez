<template>
  <div class="flex flex-col bg-gray-500">
    <HeaderView />
    <main class="w-full h-auto flex justify-center">
      <div class="bg-gray-700 w-[90%]">
        <div class="flex flex-col m-auto items-center bg-gray-400 max-w-[32rem]">
          <PlayerBar />

          <BoardView />

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
import BoardView from '../components/BoardView.vue';
import ButtonPlay from '../components/ButtonPlay.vue';
import HeaderView from '../components/HeaderView.vue';
import PlayerBar from '../components/PlayerBar.vue';
import TimeOptions from '../components/TimeOptions.vue';
</script>
