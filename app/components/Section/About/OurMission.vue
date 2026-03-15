<!-- src/components/sections/MissionSection.vue -->

<script setup lang="ts">
const stats = [
  {
    icon: 'mdi:eye',
    value: 'Transparência Total',
    label: 'Você sabe exatamente o que vai receber, quando e por qual preço. Sem surpresas, sem rodeios.'
  },
  {
    icon: 'mdi:star',
    value: 'Qualidade Garantida',
    label: 'Cada detalhe importa. Executamos com o mesmo padrão em todos os projetos, sem exceção.'
  },
  {
    icon: 'mdi:clock',
    value: 'Prazos Respeitados',
    label: 'Se dissemos 30 dias, você recebe em 30 dias. Porque sua confiança é nosso compromisso.'
  }
]
</script>

<template>
  <section class="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white">
    <UContainer>
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        <div class="flex-1 space-y-3">
          <div>
            <p class="text-orange-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
              O que nos move
            </p>
          </div>

          <div>
            <h2 class="title-section">
              Nossa missão: mais que construir, transformar
            </h2>
          </div>

          <div class="space-y-6 text-gray-600 leading-relaxed text-[16px]">
            <p>
              Não estamos aqui apenas para erguer estruturas. Estamos aqui para transformar
              vidas através de espaços bem construídos, onde as pessoas possam criar memórias,
              crescer seus negócios e realizar seus sonhos.
            </p>
            <p>
              Acreditamos que qualidade é um direito, não um privilégio. Por isso, garantimos
              que cada projeto - seja uma reforma simples ou uma construção complexa - receba
              a mesma dedicação, profissionalismo e cuidado.
            </p>
          </div>

          <div class="pt-4 space-y-3">
            <div v-for="(pillar, index) in stats" :key="index"
              class="flex bg-gray-50/70 items-start gap-4 p-4 rounded-xl border border-gray-100/50 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
              <div
                class="w-12 h-12 bg-orange-100/50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                <UIcon :name="pillar.icon" class="w-6 h-6 text-orange-500" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-blue-500 mb-1">{{ pillar.value }}</p>
                <p class="text-sm text-gray-500 leading-relaxed">{{ pillar.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 flex justify-center lg:justify-end">
          <div class="w-full max-w-xs lg:max-w-sm">
            <img src="/images/about/cover-4.jpg" alt="Profissional dedicado transformando espaços"
              class="w-full aspect-[9/16] object-cover rounded-3xl shadow-lg" loading="lazy">
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
/* Smooth transitions */
div {
  transition: all 0.3s ease;
}
</style>