<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto bg-gray-500/50 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-stone-500 rounded-lg shadow-sm dark:bg-gray-700">
        <button
          @click="closeModal"
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <h3 class="mb-5 text-lg font-normal text-white dark:text-gray-400">
            Ganaron las {{ props.color }}
          </h3>
          <a
            href="/game-same-pc"
            class="text-white cursor-pointer bg-cyan-700 hover:bg-cyan-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Nuevo juego
          </a>
          <RouterLink
            to="/"
            class="text-white ml-4 cursor-pointer bg-cyan-700 hover:bg-cyan-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Home
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{ close: [checkmate: boolean] }>();

interface Props {
  color: string | null;
}

const props = defineProps<Props>();

const closeModal = () => {
  const close = false;
  emits('close', close);
};
</script>
