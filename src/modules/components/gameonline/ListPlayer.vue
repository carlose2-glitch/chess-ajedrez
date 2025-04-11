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
  <div v-else class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
    <div class="bg-gray-100 py-2 px-4 flex gap-1 justify-center">
      <p class="text-gray-800 font-bold">{{ props.name }}</p>
    </div>
    <ul class="divide-gray-200 h-63 overflow-auto scrollbar">
      <li
        v-for="(u, index) in arrayUsers"
        v-bind:key="index"
        class="flex items-center justify-between py-4 px-6 hover:bg-gray-300 cursor-pointer"
      >
        <span class="text-gray-700 text-lg font-medium mr-4">{{ index + 1 }}</span>

        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-800">{{ u.user }}</h3>
          <p class="text-gray-600 text-base">{{ u.points }}</p>
        </div>

        <div class="flex gap-4 items-center">
          <div :class="statusPlayers(u.online)"></div>
          <button
            @click="challenge(u.user, u.online)"
            class="text-white p-2 font-bold rounded-md hover:bg-gray-500 cursor-pointer bg-gray-700"
          >
            Desafiar
          </button>
        </div>
      </li>
    </ul>
  </div>
  <ModalInvitation
    v-if="openSettings"
    :userTo="nameGame"
    :user-from="props.nameUser"
    :open="openSettings"
    @open-modal="openModal"
  />
</template>

<script lang="ts" setup>
import { findPlayers } from '@/modules/actions/findplayers';
import { useQuery } from '@tanstack/vue-query';
import { io } from 'socket.io-client';
import { ref } from 'vue';
import ModalInvitation from './ModalInvitation.vue';

interface Props {
  name: string;
  nameUser: string;
}

interface Users {
  user: string;
  points: number;
  online: boolean | null;
}

interface StatusPlayer {
  user: string | null;

  online: boolean | null;
}

interface Invitation {
  userFrom: string;
  userTo: string;
  time: string;
  movements: string;
}

const users = ref<Users[]>([]);

const props = defineProps<Props>();

const arrayUsers = ref<Users[]>([]);

const openSettings = ref<boolean>(false);

const nameGame = ref<string>('');

const emits = defineEmits<{ wait: [d: boolean, a: boolean, name: string] }>();

/*evento del websocket */

//import.meta.env.VITE_URL_API_PROD,
const socket = io(import.meta.env.VITE_URL_API_LOCAL, {
  auth: {
    user: props.nameUser,
  },
});

const arrayOn = ref<StatusPlayer[]>([]);

socket.on('clients-online', (e: StatusPlayer[]) => {
  arrayOn.value = e;
});
/*cargar usuarios */
const { isLoading } = useQuery({
  queryKey: ['users', users],
  queryFn: async () => {
    const data = await findPlayers(props.nameUser);
    arrayUsers.value = data;

    arrayUsers.value.forEach((e, i) => {
      arrayOn.value.forEach((f) => {
        if (e.user === f.user) {
          arrayUsers.value[i].online = f.online;
        }
      });
    });

    return data;
  },
});
/*abrir opciones del desafio */
const challenge = (name: string, online: boolean | null) => {
  if (online) {
    nameGame.value = name;
    openSettings.value = true;
  }
};
/*si el jugador esta conectado estara en color verde de lo contrario gris */
const statusPlayers = (on: boolean | null) => {
  return on === true ? 'bg-green-400 w-2 h-2 rounded-[50%]' : 'bg-gray-700 w-2 h-2 rounded-[50%]';
};

const openModal = (e: boolean, wait: boolean, userto: string, time: string, userFrom: string) => {
  emits('wait', wait, !wait, '');
  openSettings.value = e;

  socket.emit('invitation', { userFrom: userFrom, userTo: userto, time: time, movements: '0' });
};

/*invitacion de un jugador */
const invitationF = (data: Invitation) => {
  console.log(data);
  emits('wait', false, true, data.userFrom);
};

socket.on(props.nameUser, invitationF);
</script>
