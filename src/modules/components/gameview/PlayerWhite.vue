<template>
  <div class="flex gap-4 justify-around w-full">
    <div class="w-[70%] flex gap-2">
      <img src="https://www.chess.com/bundles/web/images/black_400.png" class="w-8" alt="picture" />
      <p class="">Blancas</p>
      <div class="flex gap-0.5 w-full items-center">
        <img
          v-for="(p, i) in data.enemies"
          :key="i"
          :src="'/src/images/' + p.src"
          alt="enemigos"
          class="w-1/17 h-4"
        />
      </div>
    </div>

    <div
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

const min = ref<number>(10);
const seg = ref<number>(0);

interface Props {
  run: boolean;
  enemies: deletePiece[];
}
const data = defineProps<Props>();

const emits = defineEmits<{ information: [loss: boolean, color: string] }>();

const { pause, resume } = useIntervalFn(() => {
  seg.value = seg.value === 0 ? 59 : seg.value - 1;
  min.value = seg.value === 59 ? min.value - 1 : min.value;
  /*termino el tiempo */
  if (min.value === 0 && seg.value === 0) {
    pause();
    emits('information', true, 'Negras');
  }
}, 1000);

watch(data, (e) => {
  if (e.run) {
    resume();
  } else {
    pause();
  }
});
</script>
