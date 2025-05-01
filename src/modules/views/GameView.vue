<template>
  <div v-if="isLoading">
    <div role="status" aria-label="loading">
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
  <div v-else class="flex flex-col bg-gray-700 gap-0.5">
    <EndGame v-if="final" :color="colorWin" :url="url" />
    <HeaderView :nameif="p.data" :direction="p.to" />
    <main class="w-full h-auto flex justify-center">
      <div class="w-[90%]">
        <div v-bind:class="changeTurn">
          <PlayerBlack
            v-bind:class="flip"
            :run="blackTurn"
            :time="timeGame"
            @information="finalGame"
            :enemies="whiteEnemies"
            :online="false"
            :name="null"
            :player="null"
          />

          <BoardView @final="checkMate" :change="grados" />

          <PlayerWhite
            v-bind:class="flip"
            :run="whiteTurn"
            :time="timeGame"
            @information="finalGame"
            :enemies="blackEnemies"
            :online="false"
            :name="null"
            :player="null"
          />
        </div>
      </div>
    </main>

    <ModalSelect @close-e="controlTime" />
  </div>
</template>

<script lang="ts" setup>
import HeaderView from '../components/gameview/HeaderView.vue';
import { useQuery } from '@tanstack/vue-query';

import { ref } from 'vue';
import PlayerBlack from '../components/gameview/PlayerBlack.vue';
import PlayerWhite from '../components/gameview/PlayerWhite.vue';
import BoardView from '../components/gameview/view/BoardView.vue';
import EndGame from '../components/gameview/view/EndGame.vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';

import { getToken } from '../actions/token';
import ModalSelect from '../components/settingGame/ModalSelect.vue';

const token = localStorage.getItem('token-chess');

const { data: p, isLoading } = useQuery({
  queryKey: ['token', token],
  queryFn: async () => {
    const data = await getToken(token);
    return data;
  },
});

const url = '/game-same-pc';
const timeGame = ref<string>('5');

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const grados = ref<number>(0);
const changeTurn = ref<string>(
  `rotate-${grados.value} flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`,
);
const final = ref<boolean>(false);
const colorWin = ref<string | null>(null);
const flip = ref<string>('rotate-0');

const whiteTurn = ref<boolean>(false);
const blackTurn = ref<boolean>(false);

const checkMate = (f: boolean, color: string | null, deletes: deletePiece[]) => {
  whiteEnemies.value = deletes.filter((e) => e.name?.includes('white'));
  blackEnemies.value = deletes.filter((e) => e.name?.includes('black'));
  colorWin.value = color;
  final.value = f;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        grados.value = 180;
        flip.value = 'rotate-180';
        changeTurn.value = `rotate-180 duration-700 flex flex-col m-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`;
        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        grados.value = 360;
        flip.value = 'rotate-360';
        changeTurn.value = `rotate-360 duration-700 flex flex-col m-auto items-center bg-gray-700 max-w-[32rem] gap-0.5`;
        whiteTurn.value = true;
        blackTurn.value = false;
      }
    }, 1000);
  }
};

const closeModal = (d: boolean) => {
  final.value = d;
};

const finalGame = (f: boolean, c: string) => {
  final.value = f;
  colorWin.value = c;
};
const controlTime = (t: string, r: boolean) => {
  timeGame.value = t;
  whiteTurn.value = r;
};
</script>
