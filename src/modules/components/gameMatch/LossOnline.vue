<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto bg-gray-500/50 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-stone-500 rounded-lg shadow-sm dark:bg-gray-700">
        <div class="p-4 md:p-5 text-center">
          <h3 class="mb-5 text-lg font-normal text-white dark:text-gray-400">
            Ganaron las {{ props.color }}
          </h3>
          <button
            @click="direction()"
            class="text-white cursor-pointer bg-cyan-700 hover:bg-cyan-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Nuevo juego
          </button>
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
import { useRouter } from 'vue-router';

interface Props {
  color: string | null;
  url: string;
}

const props = defineProps<Props>();
const router = useRouter();

const direction = () => {
  if (props.url === '/game-same-pc') {
    router.replace({ path: props.url });
  } else {
    router.replace({ path: props.url });
  }
};
</script>
