<template>
  <div
    class="flex overflow-y-auto bg-gray-800/70 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div class="p-4 md:p-5 text-center">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tiempo de juego</h3>

          <form
            @submit.prevent="sendData"
            class="w-full flex flex-col gap-4 items-center max-w-sm min-w-[200px]"
          >
            <div class="relative w-full">
              <select
                v-model="time"
                class="w-full bg-transparent placeholder:text-slate-700 text-slate-200 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              >
                <option class="font-bold" value="5" selected>5 min</option>
                <option class="font-bold" value="10">10 min</option>
                <option class="font-bold" value="20">20 min</option>
                <option class="font-bold" value="null">sin tiempo</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <button
              type="submit"
              class="bg-gray-800 cursor-pointer p-2 rounded-md w-1/3 hover:bg-gray-700 hover:text-green-500 text-gray-300 font-bold"
            >
              Jugar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const time = ref<string>('5');

interface Props {
  userTo: string;
  userFrom: string;
  open: boolean;
}

const data = defineProps<Props>();
const emits = defineEmits<{
  openModal: [d: boolean, wait: boolean, userTo: string, timeGame: string, userFrom: string];
}>();

const sendData = () => {
  emits('openModal', false, true, data.userTo, time.value, data.userFrom);
};
</script>
