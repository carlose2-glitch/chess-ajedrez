<template>
  <div class="w-full h-screen bg-[#a3a3a3]">
    <HeaderView />

    <main class="flex w-full justify-center pt-8 gap-4 items-center">
      <div class="flex flex-col gap-2">
        <RouterLink
          to="/game-same-pc"
          class="p-2 bg-gray-800 rounded-lg text-gray-200 font-bold cursor-pointer hover:bg-gray-600"
        >
          Mismo pc
        </RouterLink>
        <RouterLink
          to="/"
          class="p-2 bg-gray-800 rounded-lg text-center text-gray-200 font-bold cursor-pointer hover:bg-gray-600"
        >
          Online
        </RouterLink>
      </div>
      <img
        src="https://i.pinimg.com/736x/3f/28/7b/3f287b9b817b861047a553bdfddae495.jpg"
        alt="imagen"
        class="w-96 h-96 rounded-md"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderView from '../components/gameview/HeaderView.vue';

/*opciones del juego */
</script>
