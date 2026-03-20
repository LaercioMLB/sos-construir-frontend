<script setup lang="ts">
defineProps<{
  post: BlogPostCard
}>()
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`"
    class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
    <div class="w-full h-48 sm:h-56 overflow-hidden">
      <img :src="post.coverImage" :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>

    <div class="p-6 md:p-8 flex flex-col flex-grow">
      <span class="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-3">
        {{ post.categories[0] }}
      </span>

      <h3 class="font-bold text-blue-500 text-lg md:text-xl leading-tight mb-6">
        {{ post.title }}
      </h3>

      <span
        class="mt-auto inline-flex items-center gap-2 text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors">
        Leia Mais
        <Icon name="mdi:arrow-right" class="text-base" />
      </span>
    </div>
  </NuxtLink>
</template>