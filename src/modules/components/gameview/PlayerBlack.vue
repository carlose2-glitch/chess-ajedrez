<template>
  <div class="flex gap-4 justify-around w-full">
    <div class="w-[80%] flex gap-2">
      <img src="https://www.chess.com/bundles/web/images/black_400.png" class="w-8" alt="picture" />
      <p class="font-bold text-gray-200">{{ data.name !== null ? data.name : 'Negras' }}</p>
      <div class="flex w-full">
        <img
          v-for="(p, i) in data.enemies"
          :key="i"
          :src="'/src/images/' + p.src"
          alt="enemigos"
          class="w-1/15 h-6"
        />
      </div>
    </div>

    <div
      v-if="isNaN(min)"
      class="font-bold justify-center text-gray-300 flex gap-1.5 w-[20%] bg-gray-600 pt-0.5 pb-0.5 pr-1 pl-1 rounded-md"
    >
      <span class="text-xl">infinite</span>
    </div>

    <div
      v-else
      class="font-bold justify-center text-gray-300 flex gap-1.5 w-[20%] bg-gray-600 pt-0.5 pb-0.5 pr-1 pl-1 rounded-md"
    >
      <span class="text-xl">{{ min < 10 ? 0 : null }}{{ min }}</span
      >:<span class="text-xl">{{ seg < 10 ? 0 : null }}{{ seg }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { deletePiece } from '@/modules/interfaces/gamefuntions/pieces.interface';
import { useIntervalFn } from '@vueuse/core';

import { ref, watch } from 'vue';

interface Props {
  run: boolean;
  enemies: deletePiece[];
  time: number | null;
  online: boolean;
  name: string | null;
  player: string | null;
  segg: number | null;
  movements: number;
}

interface Time {
  min: number;
  seg: number;
}
const data = defineProps<Props>();

const emits = defineEmits<{ information: [loss: boolean, color: string] }>();

const min = ref<number>(Number(data.time));

const seg = ref<number>(Number(data.segg));

const { pause, resume } = useIntervalFn(() => {
  seg.value = seg.value === 0 ? 59 : seg.value - 1;
  min.value = seg.value === 59 ? min.value - 1 : min.value;

  window.localStorage.setItem('time-chess', JSON.stringify({ min: min.value, seg: seg.value }));
  /*termino el tiempo */
  if (min.value === 0 && seg.value === 0) {
    pause();
    window.localStorage.removeItem('time-chess');
    emits('information', true, 'Blancas');
  }
}, 1000);

if (data.movements === 0) {
  window.localStorage.removeItem('time-chess');
}

const timeLocal: string | null = window.localStorage.getItem('time-chess');

if (timeLocal && data.name === data.player) {
  const timeParse: Time = JSON.parse(timeLocal as string);

  min.value = timeParse.min;
  seg.value = timeParse.seg;
}

const start = () => {
  if (data.online) {
    if (data.name === data.player && data.run) {
      resume();
    } else {
      if (!data.run) {
        pause();
      }
      if (data.name !== data.player) {
        seg.value = Number(data.segg);
        min.value = Number(data.time);
      }
    }
  } else {
    pause();
  }
};

start();

watch(data, () => {
  start();
});
</script>
