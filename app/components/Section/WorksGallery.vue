<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import WorksGalleryCard from '../WorksGalleryCard.vue'
import type { ProjectWork } from '../WorksGalleryCard.vue'
import type { WorkGallerySection } from '~/types/sections'

const props = defineProps<{
  section: WorkGallerySection
}>()

const filters = ref(props.section.filters)
const activeFilter = ref('todos')

const projectStats = [
  { icon: 'mdi:star-outline', text: '4.8/5 Avaliação de Clientes' },
  { icon: 'mdi:checkbox-multiple-marked-circle-outline', text: '1000+ Projetos Entregues' }
]

const projects = ref<ProjectWork[]>([])
const loading = ref(true)

// Estado do clique no Mobile
const activeCardId = ref<number | string | null>(null)

// Referência e lógica do Carrossel
const carouselRef = ref<HTMLElement | null>(null)
let autoPlayInterval: ReturnType<typeof setInterval>

const startAutoPlay = () => {
  clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    // Se não existir carrossel OU se tiver um card aberto lendo, pausa o carrossel!
    if (!carouselRef.value || activeCardId.value !== null) return

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      carouselRef.value.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      carouselRef.value.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }, 5000)
}

const pauseAutoPlay = () => clearInterval(autoPlayInterval)

// Função que simula a chamada da API
const fetchProjectsFromApi = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  projects.value = [
    { id: 1, type: 'before-after', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop', beforeImageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' },
    { id: 2, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3', tag: 'Interna', title: 'Sala de Estar', author: 'Projeto de João Silva' },
    { id: 3, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3', tag: 'Externa', title: 'Fachada Moderna', author: 'Equipe SOS' },
    { id: 4, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' },
    { id: 5, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' },
    { id: 6, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' },
    { id: 7, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' },
    { id: 8, type: 'classic', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', aspectRatio: '2/3' }
  ]
  loading.value = false
  startAutoPlay()
}

onMounted(() => fetchProjectsFromApi())
onUnmounted(() => pauseAutoPlay())

const filteredProjects = computed(() => {
  if (activeFilter.value === 'todos') return projects.value
  return projects.value.slice(1)
})
</script>

<template>
  <section
    class="py-16 md:py-24  w-full overflow-hidden"
    :class="section?.bgSection"
    @click="activeCardId = null"
  >
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div class="lg:col-span-4 flex flex-col justify-between">
          <div>
            <h2 class="text-4xl lg:text-5xl font-bold text-blue-500 mb-6 leading-tight tracking-tight">
              Confira<br class="hidden lg:block"> Nossos Trabalhos
            </h2>
            <p class="text-section-subtitle text-base lg:text-lg mb-8 leading-relaxed">
              Centenas de projetos transformados em Foz do Iguaçu. Qualidade, dedicação e resultado que fala por si.
            </p>

            <div class="space-y-3 mb-10">
              <UButton
                v-for="filter in filters"
                :key="filter.slug"
                variant="ghost"
                class="w-full flex justify-between items-center px-6 py-4 rounded-xl border-2 transition-all font-bold group"
                :class="[activeFilter === filter.slug ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' : 'bg-white text-section-subtitle border-gray-100/60 hover:border-gray-200 hover:bg-gray-50']"
                @click.stop="activeFilter = filter.slug"
              >
                {{ filter.label }}
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-full"
                  :class="[activeFilter === filter.slug ? 'bg-white text-orange-500' : 'bg-gray-100 text-section-subtitle']"
                >
                  {{ filter.count }}
                </span>
              </UButton>
            </div>

            <div class="hidden lg:block space-y-4 mb-8 rounded-xl p-6 border border-gray-100">
              <div
                v-for="stat in projectStats"
                :key="stat.text"
                class="flex items-center gap-3"
              >
                <Icon
                  :name="stat.icon"
                  class="text-orange-500 text-xl flex-shrink-0"
                />
                <span class="text-blue-500 font-bold text-sm">{{ stat.text }}</span>
              </div>
            </div>
          </div>

          <UButton
            variant="outline"
            size="lg"
            class="hidden lg:flex w-full justify-center text-orange-500 border-orange-200 hover:bg-orange-50 py-3 rounded-lg font-bold"
          >
            Visualizar todos <template #trailing>
              <Icon
                name="mdi:arrow-right"
                class="text-xl"
              />
            </template>
          </UButton>
        </div>

        <div class="lg:col-span-8 relative">
          <div
            v-if="loading"
            class="grid grid-cols-2 grid-rows-2 gap-4"
          >
            <div
              v-for="i in 4"
              :key="i"
              class="w-full h-[300px] bg-gray-100 rounded-2xl animate-pulse"
            />
          </div>

          <div
            v-else
            ref="carouselRef"
            class="grid grid-rows-2 grid-flow-col gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden auto-cols-[240px] md:auto-cols-[260px] lg:auto-cols-[260px]"
            @mouseenter="pauseAutoPlay"
            @mouseleave="startAutoPlay"
            @touchstart="pauseAutoPlay"
            @touchend="startAutoPlay"
          >
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="snap-center w-full"
              @click.stop="activeCardId = activeCardId === project.id ? null : project.id"
            >
              <WorksGalleryCard
                :work="project"
                :is-active="activeCardId === project.id"
              />
            </div>
          </div>
        </div>

        <div class="col-span-1 flex lg:hidden mt-2 flex-col">
          <div class="space-y-4 mb-8 rounded-xl p-6 border border-gray-100">
            <div
              v-for="stat in projectStats"
              :key="stat.text"
              class="flex items-center gap-3"
            >
              <Icon
                :name="stat.icon"
                class="text-orange-500 text-xl flex-shrink-0"
              />
              <span class="text-blue-500 font-bold text-sm">{{ stat.text }}</span>
            </div>
          </div>

          <UButton
            variant="outline"
            size="lg"
            class="w-full flex justify-center text-orange-500 border-orange-200 hover:bg-orange-50 py-3 rounded-lg font-bold"
          >
            Visualizar todos <template #trailing>
              <Icon
                name="mdi:arrow-right"
                class="text-xl"
              />
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
