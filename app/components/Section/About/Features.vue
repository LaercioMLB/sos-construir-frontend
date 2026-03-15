<!-- src/components/sections/FeaturesSection.vue -->

<script setup lang="ts">
const features = [
  {
    icon: 'mdi:briefcase',
    title: 'Profissionais Qualificados',
    description: 'Nossa equipe é certificada, experiente e em constante atualização. Cada profissional traz expertise real.'
  },
  {
    icon: 'mdi:star',
    title: 'Qualidade Superior',
    description: 'Não fazemos concessões. Materiais premium, execução impecável e detalhes que fazem diferença.'
  },
  {
    icon: 'mdi:clock',
    title: 'Prazos Cumpridos',
    description: 'Entregamos quando prometemos. Sua confiança é nosso bem mais valioso e respeitamos isso.'
  },
  {
    icon: 'mdi:pencil-ruler',
    title: 'Gestão de Projetos',
    description: 'Planejamos cada etapa com precisão. Você acompanha o progresso do início ao fim.'
  },
  {
    icon: 'mdi:shield-check',
    title: 'Segurança e Qualidade',
    description: 'Conformidade com normas, inspeção rigorosa e garantia integral em todos os trabalhos.'
  },
  {
    icon: 'mdi:emoticon',
    title: 'Satisfação Garantida',
    description: 'Seu contentamento é nosso sucesso. Atendimento personalizado e suporte pós-obra continuado.'
  },
  {
    icon: 'mdi:face-agent',
    title: 'Suporte Pós-Obra',
    description: 'Não desaparecemos após a conclusão. Garantia integral e sempre disponível para qualquer necessidade.'
  },
  {
    icon: 'mdi:lightbulb-on',
    title: 'Inovação Constante',
    description: 'Acompanhamos tendências e novas técnicas. Soluções modernas que agregam valor ao seu projeto.'
  },
  {
    icon: 'mdi:currency-usd',
    title: 'Preço Justo',
    description: 'Transparência total. Você sabe exatamente aonde vai cada real investido, sem surpresas.'
  }
]
</script>

<template>
  <section class="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
    <UContainer>
      <div class="mb-14 md:mb-16 flex flex-col items-center text-center">
        <p class="text-orange-500 font-bold text-xs uppercase tracking-wider mb-4">
          O que nos diferencia
        </p>
        <h2 class="title-section">
          Nove razões para escolher a SOS Construir
        </h2>
        <p class="text-gray-600 text-lg max-w-3xl leading-relaxed">
          Contratar a SOS Construir é escolher profissionalismo, qualidade e tranquilidade.
          Conheça o que nos torna referência em Foz do Iguaçu.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(pillar, index) in features" :key="index"
          class="flex flex-col bg-gray-50/70 items-start gap-4 p-7 rounded-xl border border-gray-100/50 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
          <div class="w-12 h-12 bg-orange-100/30 rounded-lg flex items-center justify-center shrink-0 ">
            <UIcon :name="pillar.icon" class="w-6 h-6 text-orange-500" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-lg font-bold text-blue-500 mb-3">{{ pillar.title }}</p>
            <p class="text-sm text-gray-500 leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
