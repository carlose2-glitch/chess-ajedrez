<template>
  <!-- <div v-if="isLoading">
    <div role="status" aria-label="loading" class="flex justify-center items-center h-screen">
      <svg
        class="w-6 h-6 stroke-indigo-600 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_9023_61563)">
          <path
            d="M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444"
            stroke="stroke-current"
            stroke-width="1.4"
            stroke-linecap="round"
            class="my-path"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_9023_61563">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <main
    v-else-if="p.data === 'iniciar sesion'"
    class="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Para jugar online necesitas registarte o hacer login
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink
          to="/auth/login"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >login</RouterLink
        >
      </div>
    </div>
  </main>

  <div v-else>online</div> -->
  <div>
    <HeaderView :nameif="p.data" :direction="p.to" />
    <div class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
      <div class="bg-gray-100 py-2 px-4 flex gap-1 justify-center">
        <p class="text-gray-800 font-bold">Jugadores conectados</p>
      </div>
      <ul class="divide-gray-200 h-63 overflow-auto scrollbar">
        <li class="flex items-center justify-between py-4 px-6 hover:bg-gray-300 cursor-pointer">
          <span class="text-gray-700 text-lg font-medium mr-4">1.</span>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">Emily Jones</h3>
            <p class="text-gray-600 text-base">1234 points</p>
          </div>

          <div class="flex gap-4 items-center">
            <div class="bg-gray-700 w-2 h-2 rounded-[50%]"></div>
            <button
              @click="challenge()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Desafiar
            </button>
            <button
              @click="write()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Escribir
            </button>
          </div>
        </li>
        <li class="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
          <span class="text-gray-700 text-lg font-medium mr-4">2.</span>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">David Lee</h3>
            <p class="text-gray-600 text-base">987 points</p>
          </div>
          <div class="flex gap-4 items-center">
            <div class="bg-gray-700 w-2 h-2 rounded-[50%]"></div>
            <button
              @click="challenge()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Desafiar
            </button>
            <button
              @click="write()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Escribir
            </button>
          </div>
        </li>
        <li class="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
          <span class="text-gray-700 text-lg font-medium mr-4">3.</span>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">Sophia Williams</h3>
            <p class="text-gray-600 text-base">876 points</p>
          </div>
          <div class="flex gap-4 items-center">
            <div class="bg-gray-700 w-2 h-2 rounded-[50%]"></div>
            <button
              @click="challenge()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Desafiar
            </button>
            <button
              @click="write()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Escribir
            </button>
          </div>
        </li>
        <li class="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
          <span class="text-gray-700 text-lg font-medium mr-4">4.</span>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">Michael Chen</h3>
            <p class="text-gray-600 text-base">765 points</p>
          </div>
          <div class="flex gap-4 items-center">
            <div class="bg-gray-700 w-2 h-2 rounded-[50%]"></div>
            <button
              @click="challenge()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Desafiar
            </button>
            <button
              @click="write()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Escribir
            </button>
          </div>
        </li>
        <li class="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
          <span class="text-gray-700 text-lg font-medium mr-4">5.</span>

          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">Mia Davis</h3>
            <p class="text-gray-600 text-base">654 points</p>
          </div>
          <div class="flex gap-4 items-center">
            <div class="bg-gray-700 w-2 h-2 rounded-[50%]"></div>
            <button
              @click="challenge()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Desafiar
            </button>
            <button
              @click="write()"
              class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
            >
              Escribir
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-full flex justify-center gap-8 pt-4">
      <button class="bg-blue-800 p-4 rounded-md cursor-pointer hover:bg-blue-500 font-bold">
        Jugadores
      </button>
      <button class="bg-blue-800 p-4 rounded-md cursor-pointer hover:bg-blue-500 font-bold">
        Amigos
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { getToken } from '../actions/token';
import HeaderView from '../components/gameview/HeaderView.vue';

const token = localStorage.getItem('token-chess');

const { data: p, isLoading } = useQuery({
  queryKey: ['token', token],
  queryFn: async () => {
    const data = await getToken(token);
    return data;
  },
});

const challenge = () => {
  console.log('desafiar');
};

const write = () => {
  console.log('chatear');
};
</script>
