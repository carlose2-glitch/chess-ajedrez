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

  <div v-else>
    <HeaderView :nameif="p.data" :direction="p.to" />
    <ListPlayer
      :play-game="playGame"
      :name="dataSearch"
      :name-user="p.data"
      @wait="waitF"
      :cancel-game="gameAccepted"
      :canceled-invite="gameCaInv"
    />
    <div class="w-full flex justify-center gap-8 pt-4">
      <button
        @click="findPlayer()"
        class="bg-blue-800 p-4 rounded-md cursor-pointer hover:bg-blue-500 font-bold"
      >
        Jugadores
      </button>
      <button
        @click="findFriend()"
        class="bg-blue-800 p-4 rounded-md cursor-pointer hover:bg-blue-500 font-bold"
      >
        Amigos
      </button>
    </div>
    <WaitPlayer v-if="waitOpen" @canceled-invite="canceledInvite" />
    <AcceptedInvitation
      v-if="acceptedInvitation"
      :name="nameInvitation"
      :time="timeInvitation"
      @cancel="cGaOrAc"
    />
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { getToken } from '../actions/token';
import HeaderView from '../components/global/HeaderView.vue';
import { ref } from 'vue';

import ListPlayer from '../components/gameonline/ListPlayer.vue';
import WaitPlayer from '../components/gameonline/WaitPlayer.vue';
import AcceptedInvitation from '../components/gameonline/AcceptedInvitation.vue';

const token = localStorage.getItem('token-chess');

const dataSearch = ref<string>('Jugadores conectados');

const waitOpen = ref<boolean>(false);
const acceptedInvitation = ref<boolean | null>(false);
const nameInvitation = ref<string>('');
const timeInvitation = ref<string>('');
const gameAccepted = ref<boolean | null>(null);
const gameCaInv = ref<boolean | null>(null);
const playGame = ref<boolean | null>(null);

/*verifica si el token esta vigente */
const { data: p, isLoading } = useQuery({
  queryKey: ['token', token],
  queryFn: async () => {
    const data = await getToken(token);
    return data;
  },
});

const findPlayer = () => {
  console.log('jugadores');
  dataSearch.value = 'Jugadores conectados';
};

const findFriend = () => {
  console.log('amigos');
  dataSearch.value = 'Amigos conectados';
};
/*modal de esperar a que el usuario confirme */
const waitF = (
  wait: boolean,
  accepted: boolean | null,
  name: string,
  time: string,
  inv: boolean | null,
) => {
  waitOpen.value = wait;
  acceptedInvitation.value = accepted;
  nameInvitation.value = name;
  gameCaInv.value = inv;
  gameAccepted.value = null;

  if (time === 'null') {
    timeInvitation.value = 'Sin tiempo';
  } else {
    timeInvitation.value = time;
  }
};

const cGaOrAc = (e: boolean | null, a: boolean | null) => {
  gameAccepted.value = e;
  acceptedInvitation.value = e;
  playGame.value = a;
};

const canceledInvite = (e: boolean) => {
  gameCaInv.value = e;
  waitOpen.value = false;
};
</script>
