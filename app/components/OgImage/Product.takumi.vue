<script setup lang="ts">
const { title, image } = defineProps<{
  title?: string
  image?: string
}>()
</script>

<template>
  <div class="w-full h-full flex bg-white p-10">

    <!-- imagem -->
    <img :src="image" class="w-1/2 h-full object-cover rounded-xl" />

    <!-- texto -->
    <div class="flex flex-col justify-center pl-10">
      <h1 class="text-5xl font-bold text-blue-500">
        {{ title }}
      </h1>
      <p class="mt-4 text-xl text-gray-500">
        SOS Construir
      </p>
    </div>

  </div>
</template>