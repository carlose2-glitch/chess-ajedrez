<template>
  <div class="fixed top-0 flex w-full justify-center bg-gray-400/50 items-center h-screen">
    <div
      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col items-center pb-10">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ data.name }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >Quiere jugar contigo una partida {{ data.time === 'Sin tiempo' ? '' : 'de' }}
          {{ data.time }} {{ data.time === 'Sin tiempo' ? '' : 'minutos' }}</span
        >
        <div class="flex mt-4 md:mt-6">
          <button
            @click="playGame"
            class="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Jugar
          </button>
          <button
            @click="cancelGame"
            class="py-2 px-4 ms-2 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  time: string;
}

const data = defineProps<Props>();

const emits = defineEmits<{ cancel: [d: boolean] }>();

const playGame = () => {
  console.log('jugar');
};

const cancelGame = () => {
  emits('cancel', false);
};
</script>
