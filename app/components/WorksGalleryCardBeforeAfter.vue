<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  beforeImageUrl: string
  afterImageUrl: string
  aspectRatio?: string
  to?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const sliderPercentage = ref(50)
const isResizing = ref(false)

const updatePercentage = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const offset = clientX - rect.left
  sliderPercentage.value = Math.max(0, Math.min((offset / rect.width) * 100, 100))
}

const onMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isResizing.value = true
}

const onMouseUp = () => {
  isResizing.value = false
}

const onMouseMoveGlobal = (e: MouseEvent) => {
  if (!isResizing.value) return
  updatePercentage(e.clientX)
}

const onTouchStart = (_e: TouchEvent) => {
  isResizing.value = true
}

const onTouchMove = (e: TouchEvent) => {
  if (!isResizing.value) return
  const touch = e.touches?.[0]
  if (!touch) return
  updatePercentage(touch.clientX)
}

const onTouchEnd = () => {
  isResizing.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMoveGlobal)
  window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMoveGlobal)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div class="relative w-full rounded-2xl overflow-hidden group select-none"
    :style="{ aspectRatio: aspectRatio || '2/3' }">
    <!-- Slider -->
    <div ref="containerRef" class="absolute inset-0 cursor-ew-resize touch-none" @mousedown.stop="onMouseDown"
      @touchstart.stop="onTouchStart" @touchmove.stop="onTouchMove" @touchend.stop="onTouchEnd">
      <NuxtImg :src="beforeImageUrl" alt="Projeto Antes" class="absolute inset-0 w-full h-full object-cover z-0" />
      <NuxtImg :src="afterImageUrl" alt="Projeto Depois"
        class="absolute inset-0 w-full h-full object-cover z-10 transition-all duration-75"
        :style="{ clipPath: `inset(0 0 0 ${sliderPercentage}%)` }" />

      <div
        class="absolute bottom-4 left-4 z-20 bg-black text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-widest opacity-70">
        Antes
      </div>
      <div
        class="absolute bottom-4 right-4 z-20 bg-black text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-widest opacity-70">
        Depois
      </div>

      <div class="absolute top-0 bottom-0 z-30 transition-all duration-75" :style="{ left: `${sliderPercentage}%` }">
        <div class="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-white opacity-80 shadow-md" />
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg border-2 border-white scale-100 group-hover:scale-110 transition-transform">
          <Icon name="mdi:chevron-left-right" class="text-white text-xl" />
        </div>
      </div>
    </div>

    <!-- Botão de navegação separado, aparece no hover -->
    <NuxtLink v-if="to" :to="to"
      class="absolute top-3 right-3 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500"
      @click.stop>
      Ver projeto
      <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
    </NuxtLink>
  </div>
</template>
