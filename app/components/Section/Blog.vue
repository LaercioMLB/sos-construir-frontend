<script setup lang="ts">
const defaultSection: BaseSection = {
  title: 'Dicas e Novidades de Construção',
}

const props = defineProps<{
  section?: Partial<BaseSection>
}>()

const section = computed(() => ({
  ...defaultSection,
  ...props.section,
}))


const { posts, loading } = useBlogList()
</script>

<template>
  <section v-if="posts" class="py-16 md:py-24 w-full overflow-hidden" :class="section?.bgSection">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <span class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-3"> BLOG </span>
        <h2 class="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
          {{ section.title }}
        </h2>
      </div>

      <div v-if="loading" class="flex gap-6 overflow-hidden">
        <div v-for="i in 3" :key="i"
          class="w-[300px] md:w-[350px] shrink-0 bg-white border border-gray-100 rounded-2xl h-[400px] basis-1/3">
          <USkeleton class="h-48 w-full" />
          <div class="p-6 space-y-4">
            <USkeleton class="w-1/3 h-3" />
            <USkeleton class="w-full h-6" />
            <USkeleton class="w-2/3 h-6" />
          </div>
        </div>
      </div>

      <div v-else>
        <UCarousel v-slot="{ item }" loop wheel-gestures :autoplay="{ delay: 5000 }" :items="posts ?? []"
          :ui="{ item: 'basis-2/3 md:basis-1/3' }">
          <BlogCard :post="item" class="my-1" />
        </UCarousel>
      </div>
    </div>
  </section>
</template>