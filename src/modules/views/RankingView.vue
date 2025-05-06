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
  <div v-else class="bg-white shadow-md rounded-md p-4 mx-auto max-w-sm mt-16 flex flex-col">
    <h2 class="text-xl font-bold mb-4 text-black text-center">Top Users</h2>
    <ul class="h-63 overflow-auto scrollbar">
      <li
        v-for="(u, i) in d"
        v-bind:key="i"
        class="flex items-center justify-between py-2 border-b border-gray-300"
      >
        <div class="flex items-center">
          <span class="text-lg font-semibold mr-4 text-black">{{ i + 1 }}</span>

          <span class="text-gray-800 font-semibold">{{ u.user }}</span>
        </div>
        <span class="text-green-500 font-semibold">{{ u.points }} Points</span>
      </li>
    </ul>
  </div>
  <div class="flex justify-center mt-4">
    <RouterLink
      to="/"
      class="text-white bg-[#3b5998] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#3b5998] dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Regresar
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { getRanking } from '../actions/ranking';

const { data: d, isLoading } = useQuery({
  queryKey: ['ranking'],
  queryFn: async () => {
    const data = await getRanking();
    console.log(data);
    return data;
  },
});
</script>
