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
  <div v-else class="w-full h-screen bg-[#a3a3a3]">
    <HeaderView :nameif="p.data" :direction="p.to" :online="false" />

    <main class="flex w-full justify-center pt-8 gap-4 items-center">
      <div class="flex flex-col gap-2">
        <RouterLink
          to="/game-same-pc"
          class="p-2 bg-gray-800 rounded-lg text-gray-200 font-bold cursor-pointer hover:bg-gray-600"
        >
          Mismo pc
        </RouterLink>
        <RouterLink
          to="/online"
          class="p-2 bg-gray-800 rounded-lg text-center text-gray-200 font-bold cursor-pointer hover:bg-gray-600"
        >
          Online
        </RouterLink>
      </div>
      <img
        src="https://i.pinimg.com/736x/3f/28/7b/3f287b9b817b861047a553bdfddae495.jpg"
        alt="imagen"
        class="w-96 h-96 rounded-md hidden md:flex"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import HeaderView from '../components/global/HeaderView.vue';
import { getToken } from '../actions/token';

const token = localStorage.getItem('token-chess');

const { data: p, isLoading } = useQuery({
  queryKey: ['token', token],
  queryFn: async () => {
    const data = await getToken(token);
    return data;
  },
});
</script>
