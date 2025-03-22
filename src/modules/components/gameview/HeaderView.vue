<template>
  <nav class="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <a href="#" class="flex items-center">
        <img
          src="/src/images/logo-ajedrez-transparente.png"
          class="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white"
          >Chess</span
        >
      </a>
      <div class="flex items-center lg:order-2">
        <a
          href="#"
          class="text-white hidden lg:block hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >Iniciar sesion</a
        >

        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <svg
            @click="changeValue"
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
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-200 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              aria-current="page"
              >Ranking</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >Ver partida</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Ventana nodal del menu hamburguesa -->
  <div v-if="modal" class="w-full h-screen bg-gray-700/50 fixed">
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

        <a
          href="#"
          class="text-gray-900 bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 rounded-lg font-bold text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Ranking
        </a>
        <a
          href="#"
          class="text-gray-900 bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Ver partida
        </a>

        <a
          href="#"
          class="text-gray-900 bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Iniciar sesion
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modal = ref<boolean>(false);

const changeValue = () => {
  modal.value = !modal.value;
};
</script>
