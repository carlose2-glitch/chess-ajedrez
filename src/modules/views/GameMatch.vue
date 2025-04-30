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
  <div v-else-if="isError">{{ error }}</div>
  <div v-else-if="isSuccess" class="flex flex-col bg-gray-700 gap-0.5">
    <EndGame v-if="final" @close="closeModal" :color="colorWin" :url="url" />
    <HeaderView :nameif="d.name" direction="#" />

    <main class="w-full h-auto flex justify-center">
      <div class="w-[90%]">
        <div
          :class="
            d.board.userWhite === d.name
              ? 'rotate-0 flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5'
              : 'rotate-180 flex flex-col m-auto h-auto items-center bg-gray-700 max-w-[32rem] gap-0.5'
          "
        >
          <PlayerBlack
            :class="d.board.userWhite === d.name ? 'rotate-0' : 'rotate-180'"
            :run="blackTurn"
            :time="d.board.timeBlack.min"
            @information="finalGame"
            :enemies="whiteEnemies"
            :online="true"
            :name="d.board.userBlack"
            :player="d.name"
            :segg="d.board.timeBlack.seg"
            :movements="d.board.movements"
          />

          <BoarOnline
            @final="checkMate"
            :change="d.board.userWhite === d.name ? 0 : 180"
            :turn-player="d.board.userWhite === d.name ? 0 : 1"
            :enemy="d.name === d.board.userWhite ? d.board.userBlack : d.board.userWhite"
            :user="d.name"
            :movements-game="d.board.movements"
            :id-game="d.board.id"
            :pieces="d.board.pieces"
            :fGame="final"
            :colorF="colorWin"
          />

          <PlayerWhite
            :class="d.board.userWhite === d.name ? 'rotate-0' : 'rotate-180'"
            :run="whiteTurn"
            :time="d.board.timeWhite.min"
            @information="finalGame"
            :enemies="blackEnemies"
            :online="true"
            :name="d.board.userWhite"
            :player="d.name"
            :segg="d.board.timeWhite.seg"
            :movements="d.board.movements"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import { useQuery } from '@tanstack/vue-query';
import BoarOnline from '../components/gameMatch/BoarOnline.vue';
import { ref } from 'vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';
import HeaderView from '../components/gameview/HeaderView.vue';
import { board } from '../actions/board';
import EndGame from '../components/gameview/view/EndGame.vue';
import { winerPlayer } from '../actions/winerPlayer';
import PlayerBlack from '../components/gameview/PlayerBlack.vue';
import PlayerWhite from '../components/gameview/PlayerWhite.vue';

const route = useRoute();

const url = '/online';

const tokenUser: string | null = localStorage.getItem('token-chess');

const id: string | string[] = route.params.token;

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const colorWin = ref<string | null>(null);
const final = ref<boolean>(false);

const whiteTurn = ref<boolean>(false);
const blackTurn = ref<boolean>(false);

const {
  data: d,
  isLoading,
  isError,
  isSuccess,
  error,
} = useQuery({
  queryKey: ['id', id],
  queryFn: async () => {
    const data = await board(id, tokenUser);

    if (data.status !== 200) {
      throw new Error('Puede ser que la partida ya este finalizada');
    }
    whiteTurn.value = data.board.movements % 2 === 0 ? true : false;
    blackTurn.value = data.board.movements % 2 !== 0 ? true : false;
    return data;
  },
});

const checkMate = (f: boolean, color: string | null, deletes: deletePiece[]) => {
  whiteEnemies.value = deletes.filter((e) => e.name?.includes('white'));
  blackEnemies.value = deletes.filter((e) => e.name?.includes('black'));
  colorWin.value = color;
  final.value = f;

  const winer = ref<string>('');
  const idGame = d.value.board.id;

  if (!f) {
    setTimeout(() => {
      if (color === 'Blancas') {
        blackTurn.value = true;
        whiteTurn.value = false;
      } else {
        whiteTurn.value = true;
        blackTurn.value = false;
      }
    }, 1000);
  } else {
    if (colorWin.value === 'Blancas') {
      winer.value = d.value.board.userWhite;
    } else {
      winer.value = d.value.board.userBlack;
    }

    winerPlayer(winer.value, idGame, colorWin.value);
  }
};
const closeModal = (d: boolean) => {
  final.value = d;
};

const finalGame = (f: boolean, c: string) => {
  final.value = f;
  colorWin.value = c;
};
</script>
