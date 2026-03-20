<script setup lang="ts">
import type { WhyChooseUsSection } from '~~/shared/types/sections'

const defaultSection: WhyChooseUsSection = {
  title: 'Sua Obra sem Dor de Cabeça',
  description:
    'Mais de 10 anos transformando casas em Foz do Iguaçu com qualidade, confiança e zero dor de cabeça.',
  stats: [
    { icon: 'mdi:calendar-blank-outline', text: '10+ anos' },
    { icon: 'mdi:home-outline', text: '1000+ obras' },
    { icon: 'mdi:star-outline', text: '4.8★ avaliação' },
  ],
  reasons: [
    {
      icon: 'target',
      title: 'Gestão Centralizada',
      description:
        'Você lida apenas com a SOS. Nós coordenamos todos os profissionais para você não se estressar.',
    },
    {
      icon: 'license',
      title: 'Profissionais Certificados',
      description: 'Equipe rigorosamente selecionada, testada na prática e de extrema confiança.',
    },
    {
      icon: 'shield-check-outline',
      title: 'Garantia Integral',
      description:
        'Cobertura total contra imprevistos. Se algo sair do combinado, nós resolvemos sem custos extras.',
    },
    {
      icon: 'handshake-outline',
      title: 'Suporte Pós-Obra',
      description:
        'Nossa responsabilidade não acaba na entrega. Estaremos à disposição para qualquer ajuste futuro.',
    },
  ],
  ctaText: 'Conheça Nossa História',
  ctaLink: '/sobre',
  bgSection: 'bg-section-bg-2',
}
const props = defineProps<{
  section?: Partial<WhyChooseUsSection>
}>()

const section = computed(() => ({
  ...defaultSection,
  ...props.section,
}))
</script>

<template>
  <section class="py-16 md:py-10 w-full" :class="section.bgSection">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-16 flex flex-col items-center">
        <span class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-3">
          Por Que Escolher a SOS
        </span>
        <h2 class="title-section">
          {{ section.title }}
        </h2>
        <p class="text-section-subtitle text-base md:text-lg max-w-2xl mb-6">
          {{ section.description }}
        </p>

        <div v-if="section.stats && section.stats.length > 0"
          class="flex flex-wrap justify-center items-center gap-y-2 text-sm font-medium text-section-subtitle">
          <template v-for="(stat, index) in section.stats" :key="index">
            <div class="flex items-center gap-1.5 px-4">
              <Icon :name="stat.icon" class="text-orange-500 text-lg" />
              <span>{{ stat.text }}</span>
            </div>
            <span v-if="index < section.stats.length - 1" class="text-gray-300 hidden sm:block">|</span>
          </template>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-6 mb-16gap-6 mb-16 place-content-center ">
        <div v-for="(reason, index) in section.reasons" :key="index"
          class="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100/50 max-w-[18rem] ">
          <div class="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
            <Icon :name="'mdi:' + reason.icon" class="text-3xl text-orange-500" />
          </div>

          <h3 class="font-bold text-blue-500 text-lg mb-3">
            {{ reason.title }}
          </h3>
          <p class="text-sm text-section-subtitle leading-relaxed">
            {{ reason.description }}
          </p>
        </div>
      </div>
      <div class="flex justify-center w-full ">
        <UButton :to="section.ctaLink" color="primary" variant="solid" size="xl"
          class="text-white font-bold px-8 py-3 rounded-lg transition-colors w-full md:w-auto  justify-center">
          {{ section.ctaText }}
          <template #trailing>
            <Icon name="mdi:arrow-right" class="text-xl" />
          </template>
        </UButton>
      </div>
    </div>
  </section>
</template>
