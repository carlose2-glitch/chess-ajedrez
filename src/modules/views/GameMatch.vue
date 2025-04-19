<template>
  <div v-if="isLoading">
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
  <div v-else-if="isError">error</div>
  <div v-else class="flex flex-col bg-gray-700 gap-0.5">
    <HeaderView :nameif="d.name" direction="#" />

    <main class="w-full h-auto flex justify-center">
      <div class="w-[90%]">
        <div
          :class="
            d.juego === 0
              ? 'rotate-0 flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5'
              : 'rotate-180 flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5'
          "
        >
          <BoarOnline
            @final="checkMate"
            :change="d.juego === 0 ? 0 : 180"
            :turn-player="d.juego"
            :enemy="d.enemy"
            :user="d.name"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { deaperture } from '../actions/token';
import { useQuery } from '@tanstack/vue-query';
import BoarOnline from '../components/gameMatch/BoarOnline.vue';
import { ref } from 'vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';
import HeaderView from '../components/gameview/HeaderView.vue';

const route = useRoute();

const tokenUser: string | null = localStorage.getItem('token-chess');

const token: string | string[] = route.params.token;

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const colorWin = ref<string | null>(null);
const final = ref<boolean>(false);
const flip = ref<string>('rotate-0');
const whiteTurn = ref<boolean>(false);
const blackTurn = ref<boolean>(false);

const {
  data: d,
  isLoading,
  isError,
} = useQuery({
  queryKey: ['token', token],
  queryFn: async () => {
    const data = await deaperture(tokenUser, token);
    return data;
  },
});

const checkMate = (f: boolean, color: string | null, deletes: deletePiece[]) => {
  whiteEnemies.value = deletes.filter((e) => e.name?.includes('white'));
  blackEnemies.value = deletes.filter((e) => e.name?.includes('black'));
  colorWin.value = color;
  final.value = f;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        flip.value = 'rotate-180';

        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        flip.value = 'rotate-360';

        whiteTurn.value = true;
        blackTurn.value = false;
      }
    }, 1000);
  }
};
</script>
