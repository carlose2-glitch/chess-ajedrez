<template>
  <div class="flex fixed justify-center items-center w-full h-screen text-black">
    <span class="countdown font-mono text-6xl">
      <span :style="'--value:' + time + ';'" aria-live="polite" aria-label="10">{{ time }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

const time = ref<number>(10);

const { resume } = useIntervalFn(() => {
  if (time.value === 0) {
    console.log('se acabo');
  }
  time.value = time.value - 1;
}, 1000);

resume();
</script>
