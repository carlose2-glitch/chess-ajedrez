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
  <div v-else-if="isError" class="flex items-center justify-center gap-4 flex-col w-full h-screen">
    <div>
      {{ error }}
    </div>
    <RouterLink
      to="/"
      class="text-black block bg-gray-400 hover:bg-gray-300 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-300"
      >Home</RouterLink
    >
  </div>
  <div v-else-if="isSuccess" class="flex flex-col bg-gray-700 gap-0.5">
    <TimeLimit v-if="disco" :time="time" @end="timeOut" />
    <WarningGame v-if="finishedGame" @exit="exitGame" />
    <EndGame v-if="final" :color="colorWin" :url="url" />
    <LossOnline v-if="loss" :color="colorWin" :url="url" />
    <HeaderView :nameif="d.name" direction="#" :online="true" @close="finished" />

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
            :time="minBlack"
            @information="finalGame"
            :enemies="whiteEnemies"
            :online="true"
            :name="d.board.userBlack"
            :player="d.name"
            :segg="segBlack"
            :movements="d.board.movements"
            :run-time="d.board.time"
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
            :end-time="finalTime"
          />

          <PlayerWhite
            :class="d.board.userWhite === d.name ? 'rotate-0' : 'rotate-180'"
            :run="whiteTurn"
            :time="minWhite"
            @information="finalGame"
            :enemies="blackEnemies"
            :online="true"
            :name="d.board.userWhite"
            :player="d.name"
            :segg="segWhite"
            :movements="d.board.movements"
            :run-time="d.board.time"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import { useQuery } from '@tanstack/vue-query';
import BoarOnline from '../components/gameMatch/view/BoarOnline.vue';
import { ref } from 'vue';
import type { deletePiece } from '../interfaces/gamefuntions/pieces.interface';
import HeaderView from '../components/global/HeaderView.vue';
import { board } from '../actions/board';
import EndGame from '../components/global/EndGame.vue';
import { winerPlayer } from '../actions/winerPlayer';
import PlayerBlack from '../components/gameMatch/time/PlayerBlack.vue';
import PlayerWhite from '../components/gameMatch/time/PlayerWhite.vue';
import LossOnline from '../components/gameMatch/LossOnline.vue';
import WarningGame from '../components/gameMatch/WarningGame.vue';
import TimeLimit from '../components/gameMatch/TimeLimit.vue';

const finishedGame = ref<boolean>(false);

const disco = ref<boolean>(false);
const time = ref<number>(30);

const route = useRoute();

const url = '/online';

const tokenUser: string | null = localStorage.getItem('token-chess');

const id: string | string[] = route.params.token;

const whiteEnemies = ref<deletePiece[]>([]);
const blackEnemies = ref<deletePiece[]>([]);

const colorWin = ref<string | null>(null);
const final = ref<boolean>(false);
const loss = ref<boolean>(false);

const whiteTurn = ref<boolean>(false);
const blackTurn = ref<boolean>(false);

const minWhite = ref<number | null>(null);
const segWhite = ref<number | null>(null);
const minBlack = ref<number | null>(null);
const segBlack = ref<number | null>(null);
const finalTime = ref<boolean>(false);

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
    minWhite.value = data.board.timeWhite.min;
    segWhite.value = data.board.timeWhite.seg;
    minBlack.value = data.board.timeBlack.min;
    segBlack.value = data.board.timeBlack.seg;
    return data;
  },
});

interface Time {
  min: number;
  seg: number;
}

const checkMate = (
  jm: boolean,
  ls: boolean,
  color: string | null,
  deletes: deletePiece[],
  t: Time | null,
  dis: boolean,
) => {
  whiteEnemies.value = deletes.filter((e) => e.name?.includes('white'));
  blackEnemies.value = deletes.filter((e) => e.name?.includes('black'));
  colorWin.value = color;
  final.value = jm;
  loss.value = ls;

  const winer = ref<string>('');
  const idGame = d.value.board.id;
  /*jaque mate */
  if (!jm) {
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
    /*ganador */

    if (d.value.name === winer.value && finalTime.value) {
      winerPlayer(winer.value, idGame, colorWin.value);
    } else {
      if (d.value.name === winer.value) {
        winerPlayer(winer.value, idGame, colorWin.value);
      }
      /*se acabo el tiempo o desconeccion guardar puntos*/
      if (finalTime.value) {
        winerPlayer(winer.value, idGame, colorWin.value);
      }
    }
  }

  if (d.value.name !== d.value.board.userWhite && t) {
    minWhite.value = t.min;
    segWhite.value = t.seg;
  } else if (d.value.name !== d.value.board.userBlack && t) {
    minBlack.value = t.min;
    segBlack.value = t.seg;
  }
  /*verifica si el usuario esta conectado*/
  if (dis && !ls && !final.value) {
    disco.value = dis;
  } else {
    disco.value = false;
    time.value = 30;
  }
};
/*se acabo el tiempo */
const finalGame = (f: boolean, c: string) => {
  final.value = f;
  colorWin.value = c;
  finalTime.value = f;
  whiteTurn.value = false;
  blackTurn.value = false;
};
/*opcion si el usuario quiere terminar el juego al presionar cualquier elemento de la cabecera */
const finished = (e: boolean) => {
  finishedGame.value = e;
};
/*salir del juego */
const exitGame = (e: boolean) => {
  if (e) {
    final.value = e;
    colorWin.value = d.value.board.userWhite === d.value.name ? 'Negras' : 'Blancas';
    whiteTurn.value = false;
    blackTurn.value = false;
  }
  finishedGame.value = e;
};
/*tiempo del usuario desconectado */
const timeOut = (e: boolean) => {
  final.value = e;
  colorWin.value = d.value.board.userWhite === d.value.name ? 'Blancas' : 'Negras';
  finalTime.value = e;
  whiteTurn.value = false;
  blackTurn.value = false;
};
</script>
