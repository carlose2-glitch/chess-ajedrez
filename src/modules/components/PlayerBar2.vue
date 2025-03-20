<template>
  <div class="flex gap-4">
    <img src="" alt="picture" />
    <p>Oponente</p>
    <div>{{ min < 10 ? 0 : null }}{{ min }}:{{ seg < 10 ? 0 : null }}{{ seg }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const min = ref<number>(10);
const seg = ref<number>(0);

const time = () => {
  seg.value = seg.value === 0 ? 59 : seg.value - 1;
  min.value = seg.value === 59 ? min.value - 1 : min.value;
  /*termino el tiempo */
  if (min.value === 0 && seg.value === 0) {
    clearInterval(controlTime);
  }
};

const controlTime = setInterval(time, 1000);
</script>
