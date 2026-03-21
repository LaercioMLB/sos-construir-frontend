<script setup lang="ts">
defineProps<{
  post: BlogPostCard
  variant?: 'card' | 'article'
}>()
</script>

<template>
  <!-- CARD (carousel / blog list) -->
  <NuxtLink v-if="!variant || variant === 'card'" :to="`/blog/${post.slug}`"
    class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
    <div class="w-full h-48 sm:h-56 overflow-hidden">
      <img :src="post.coverImage" :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div class="p-6 md:p-8 flex flex-col flex-grow">
      <span class="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-3">
        {{ post.categories[0]?.name }}
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

  <!-- ARTICLE (blog index grid) -->
  <article v-else
    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
    <NuxtLink :to="`/blog/${post.slug}`" class="block overflow-hidden h-56 shrink-0">
      <img :src="post.coverImage" :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </NuxtLink>

    <div class="p-6 flex flex-col flex-1">
      <span class="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-3">

        {{ post.categories[0]?.name }}
      </span>

      <NuxtLink :to="`/blog/${post.slug}`">
        <h3 class="font-bold text-xl text-blue-500 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {{ post.title }}
        </h3>
      </NuxtLink>

      <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
        {{ post.summary }}
      </p>

      <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div class="flex items-center gap-4 text-xs text-gray-400 font-medium">
          <span>{{ post.date }}</span>
          <span>{{ post.readingTime }} de leitura</span>
        </div>
        <NuxtLink :to="`/blog/${post.slug}`"
          class="text-orange-500 font-bold text-sm flex items-center gap-1 hover:text-orange-600">
          Ler post
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
