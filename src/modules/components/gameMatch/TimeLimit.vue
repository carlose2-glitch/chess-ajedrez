<template>
  <div
    class="flex z-30 bg-gray-700/50 fixed justify-center items-center w-full h-screen text-black flex-col"
  >
    <p class="font-bold text-white">El contricante no esta conectado</p>
    <span class="countdown font-mono text-6xl text-white">
      <span :style="'--value:' + t + ';'" aria-live="polite" aria-label="10">{{ time }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

interface Props {
  time: number;
}

const props = defineProps<Props>();
const emits = defineEmits<{ end: [f: boolean] }>();

const t = ref<number>(props.time);

const { resume } = useIntervalFn(() => {
  if (t.value === 0) {
    emits('end', true);
  }
  t.value = t.value - 1;
}, 1000);

resume();
</script>
