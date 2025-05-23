<template>
  <nav class="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <div @click="closeGame()" class="flex items-center cursor-pointer">
        <img
          src="/src/images/logo-ajedrez-transparente.png"
          class="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white"
          >Chess</span
        >
      </div>

      <div class="flex items-center lg:order-2">
        <RouterLink
          :to="dataP.direction"
          class="text-white hidden lg:block hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >{{ dataP.nameif }}</RouterLink
        >
        <button
          v-show="dataP.direction === '#'"
          @click="closeSection"
          class="text-white cursor-pointer hidden lg:block hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        >
          Cerrar sesion
        </button>

        <button
          @click="changeValue"
          data-collapse-toggle="mobile-menu-2"
          class="inline-flex items-center hover:cursor-pointer p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 14 14"
            id="meteor-icon-kit__solid-bars-s"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 3.5C0.67157 3.5 0 2.82843 0 2C0 1.17157 0.67157 0.5 1.5 0.5H12.5C13.3284 0.5 14 1.17157 14 2C14 2.82843 13.3284 3.5 12.5 3.5H1.5zM1.5 8.5C0.67157 8.5 0 7.8284 0 7C0 6.1716 0.67157 5.5 1.5 5.5H12.5C13.3284 5.5 14 6.1716 14 7C14 7.8284 13.3284 8.5 12.5 8.5H1.5zM1.5 13.5C0.67157 13.5 0 12.8284 0 12C0 11.1716 0.67157 10.5 1.5 10.5H12.5C13.3284 10.5 14 11.1716 14 12C14 12.8284 13.3284 13.5 12.5 13.5H1.5z"
                fill="#ede8e8"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div
        class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
            <button
              @click="ranking()"
              class="block py-2 pr-4 pl-3 hover:cursor-pointer text-gray-400 hover:text-gray-200 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              aria-current="page"
            >
              Ranking
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Ventana nodal del menu hamburguesa -->
  <div v-if="modal" class="w-full h-screen bg-gray-700/50 fixed z-20">
    <div class="p-6 flex flex-col">
      <div class="flex flex-col items-center justify-center gap-4 h-[40rem]">
        <svg
          @click="modal = !modal"
          class="h-10 w-10"
          viewBox="0 -0.5 8 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>close_mini [#ebe5e5]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-385.000000, -206.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <polygon
                    id="close_mini-[#ebe5e5]"
                    points="334.6 49.5 337 51.6 335.4 53 333 50.9 330.6 53 329 51.6 331.4 49.5 329 47.4 330.6 46 333 48.1 335.4 46 337 47.4"
                  ></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg>

        <button
          @click="ranking()"
          class="text-gray-900 bg-gradient-to-r hover:cursor-pointer from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 rounded-lg font-bold text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Ranking
        </button>

        <RouterLink
          :to="dataP.direction"
          class="text-gray-900 bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 outline-none dark:focus:ring-teal-700 font-bold rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          {{ dataP.nameif }}
        </RouterLink>
        <button
          v-show="dataP.direction === '#'"
          @click="closeSection"
          class="text-gray-900 bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const modal = ref<boolean>(false);
const router = useRouter();
const route = useRoute();

interface Props {
  nameif: string;
  direction: string;
  online: boolean;
}

const dataP = defineProps<Props>();
const changeValue = () => {
  modal.value = !modal.value;
};

const emit = defineEmits<{ close: [c: boolean] }>();
/*cerrar sesion */
const closeSection = () => {
  if (dataP.online) {
    emit('close', dataP.online);
  } else {
    localStorage.removeItem('token-chess');
    if (route.path === '/') {
      location.reload();
    } else {
      router.replace({ path: '/' });
    }
  }
};
/* evalua si esta en una partida online  */
const closeGame = () => {
  if (dataP.online) {
    emit('close', dataP.online);
  } else {
    router.replace({ path: '/' });
  }
};
/*ranking */

const ranking = () => {
  if (dataP.online) {
    emit('close', dataP.online);
  } else {
    router.replace({ path: '/ranking' });
  }
};
</script>
