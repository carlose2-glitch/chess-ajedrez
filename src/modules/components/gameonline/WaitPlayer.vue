<template>
  <div
    class="flex justify-center gap-4 fixed top-0 right-0 w-full h-screen bg-gray-700/50 items-center space-x-2"
  >
    <svg class="h-20 w-20 animate-spin stroke-white" viewBox="0 0 256 256">
      <line
        x1="128"
        y1="32"
        x2="128"
        y2="64"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="195.9"
        y1="60.1"
        x2="173.3"
        y2="82.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="224"
        y1="128"
        x2="192"
        y2="128"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="195.9"
        y1="195.9"
        x2="173.3"
        y2="173.3"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="128"
        y1="224"
        x2="128"
        y2="192"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="60.1"
        y1="195.9"
        x2="82.7"
        y2="173.3"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="32"
        y1="128"
        x2="64"
        y2="128"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <line
        x1="60.1"
        y1="60.1"
        x2="82.7"
        y2="82.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
    </svg>
    <span class="text-4xl font-medium text-white">Esperando...</span>

    <button
      @click="canceledInvite"
      class="text-white cursor-pointer hover:bg-red-400 bg-red-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
    >
      Cancelar
    </button>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{ canceledInvite: [d: boolean] }>();
const canceledInvite = () => {
  emits('canceledInvite', false);
};
</script>
