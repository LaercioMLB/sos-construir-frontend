<script setup lang="ts">
import type { SolutionsSection } from '@/types/sections'

const _props = withDefaults(defineProps<{
  section?: SolutionsSection
}>(), {
  section: () => ({
    kicker: 'EXPLORE POR CATEGORIA',
    title: 'Nossas Soluções',
    description: 'Tudo o que sua casa precisa, em um único lugar.',
    ctaText: 'Ver todos os 30+ Serviços',
    ctaLink: '#',
    cards: [
      {
        id: 1,
        type: 'image',
        colSpan: 2,
        title: 'Construção Civil & Reformas',
        description: 'Do projeto estrutural ao acabamento final. Gerenciamento completo da sua obra residencial ou comercial.',
        icon: 'mdi:hard-hat',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 2,
        type: 'standard',
        colSpan: 1,
        title: 'Instalações Elétricas',
        description: 'Rede residencial, industrial e projetos de energia solar fotovoltaica.',
        icon: 'mdi:lightning-bolt'
      },
      {
        id: 3,
        type: 'standard',
        colSpan: 1,
        title: 'Hidráulica',
        description: 'Instalação, manutenção, caça-vazamentos e limpeza de caixas d\'água.',
        icon: 'mdi:water-outline'
      },
      {
        id: 4,
        type: 'image',
        colSpan: 1,
        title: 'Piscinas & Lazer',
        description: 'Construção, manutenção e tratamento de piscinas.',
        icon: 'mdi:water-polo',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 5,
        type: 'standard',
        colSpan: 1,
        title: 'Pintura & Acabamento',
        description: 'Pintura interna, externa, texturas e efeitos decorativos.',
        icon: 'mdi:format-paint'
      }
    ],
    bgSection: 'bg-section-bg-2'
  })
})
</script>

<template>
  <section class="py-16 md:py-24 w-full" :class="section.bgSection">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-3">
            {{ section.kicker }}
          </span>
          <h2 class="title-section">
            {{ section.title }}
          </h2>
          <p class="text-section-subtitle text-base md:text-lg">
            {{ section.description }}
          </p>
        </div>

        <UButton
          v-if="section.ctaText"
          :to="section.ctaLink"
          color="primary"
          variant="outline"
          size="lg"
          class="hidden md:flex items-center py-2.5 px-9 rounded-lg font-bold transition-colors"
        >
          {{ section.ctaText }}
          <template #trailing>
            <Icon name="mdi:arrow-right" class="text-lg" />
          </template>
        </UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="card in section.cards"
          :key="card.id"
          :to="card.link || '#'"
          class="relative rounded-2xl overflow-hidden group transition-all duration-300 md:max-h-[240px]"
          :class="[
            card.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1',
            card.type === 'image' ? 'h-[280px] md:h-[240px]' : 'h-full md:min-h-[240px] bg-white border border-gray-100 shadow-sm hover:shadow-md'
          ]"
        >
          <template v-if="card.type === 'image'">
            <UCard class="flex flex-col justify-between h-full">
              <img
                :src="card.image"
                :alt="card.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              <template #header>
                <div class="absolute z-20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors bg-white/10 backdrop-blur-xs">
                  <Icon :name="card.icon" class="text-white text-2xl" />
                </div>
              </template>
              <template #footer>
                <div class="absolute bottom-10 z-20 p-2 md:p-0 flex flex-col">
                  <h3 class="text-lg md:text-xl font-bold text-white mb-3">
                    {{ card.title }}
                  </h3>
                  <p class="text-section-subtitle text-sm text-white/80 leading-relaxed">
                    {{ card.description }}
                  </p>
                </div>
              </template>
            </UCard>
          </template>

          <template v-else>
            <UCard variant="solid" class="bg-white">
              <template #header>
                <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                  <Icon :name="card.icon" class="text-orange-500 text-2xl" />
                </div>
              </template>
              <template #footer>
                <div class="p-2 md:p-0 flex flex-col">
                  <h3 class="text-lg md:text-xl font-bold text-blue-500 mb-3">
                    {{ card.title }}
                  </h3>
                  <p class="text-section-subtitle text-sm leading-relaxed">
                    {{ card.description }}
                  </p>
                </div>
              </template>
            </UCard>
          </template>
        </NuxtLink>
      </div>
      <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="card in section.cards"
          :key="card.id"
          :to="card.link || '#'"
          class="relative rounded-2xl overflow-hidden group transition-all duration-300"
          :class="[
            card.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1',
            card.type === 'image' ? 'h-[280px] md:h-[320px]' : 'h-full min-h-[280px] bg-white border border-gray-100 shadow-sm hover:shadow-md'
          ]"
        >
          <template v-if="card.type === 'image'">
            <img
              :src="card.image"
              :alt="card.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            <div class="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
              <div class="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
                <Icon :name="card.icon" class="text-white text-xl" />
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
                {{ card.title }}
              </h3>
              <p class="text-white/80 text-sm leading-relaxed max-w-lg">
                {{ card.description }}
              </p>
            </div>
          </template>

          <template v-else>
            <div class="p-6 md:p-8 flex flex-col h-full">
              <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <Icon :name="card.icon" class="text-orange-500 text-2xl" />
              </div>
              <h3 class="text-lg md:text-xl font-bold text-blue-500 mb-3">
                {{ card.title }}
              </h3>
              <p class="text-section-subtitle text-sm leading-relaxed">
                {{ card.description }}
              </p>
            </div>
          </template>
        </NuxtLink>
      </div> -->
      <div class="mt-8 flex md:hidden justify-center">
        <UButton
          v-if="section.ctaText"
          :to="section.ctaLink"
          color="primary"
          variant="outline"
          size="lg"
          class="w-full flex justify-center font-bold"
        >
          {{ section.ctaText }}
          <template #trailing>
            <Icon name="mdi:arrow-right" class="text-xl" />
          </template>
        </UButton>
      </div>
    </div>
  </section>
</template>
