<template>
  <div class="flex gap-4 justify-around w-full">
    <div class="w-[70%] flex gap-2">
      <img src="" alt="picture" />
      <p class="">Oponente</p>
      <div>
        <img src="" alt="enemigos" />
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
import { useIntervalFn } from '@vueuse/core';

import { ref, watch } from 'vue';

interface Props {
  run: boolean;
}
const data = defineProps<Props>();

const emits = defineEmits<{ information: [loss: boolean, color: string] }>();

const min = ref<number>(10);
const seg = ref<number>(0);

const { pause, resume } = useIntervalFn(() => {
  seg.value = seg.value === 0 ? 59 : seg.value - 1;
  min.value = seg.value === 59 ? min.value - 1 : min.value;
  /*termino el tiempo */
  if (min.value === 0 && seg.value === 0) {
    pause();
    emits('information', true, 'Blancas');
  }
}, 1000);

pause();

watch(data, (e) => {
  if (e.run) {
    resume();
  } else {
    pause();
  }
});
</script>
