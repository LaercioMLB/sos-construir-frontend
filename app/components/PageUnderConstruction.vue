<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    whatsappNumber?: string
    defaultMessage?: string
  }>(),
  {
    title: 'Página em Construção',
    description:
      'Enquanto finalizamos, nossa equipe está pronta para tirar todas as suas dúvidas diretamente pelo WhatsApp!',
    whatsappNumber: '554599976544',
    defaultMessage: 'Olá! Estava navegando no site e gostaria de mais informações.',
  }
)

const whatsappLink = computed(() => {
  const text = encodeURIComponent(props.defaultMessage)
  return `https://wa.me/${props.whatsappNumber}?text=${text}`
})
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-t from-white to-gray-50">
    <div class="max-w-2xl w-full text-center space-y-8">
      <div class="relative inline-flex justify-center items-center">
        <div class="relative bg-orange-100/50 p-6 rounded-full flex items-center justify-center">
          <UIcon name="mdi:account-hard-hat-outline" class="w-16 h-16 text-orange-500" />
        </div>
      </div>

      <div class="space-y-4">
        <h1 class="text-6xl font-extrabold text-blue-500 mb-4">
          {{ title }}
        </h1>
        <span class="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          {{ description }}
        </span>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <UButton :to="whatsappLink" target="_blank" color="primary" variant="solid" size="xl"
          class="text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2">
          <template #leading>
            <Icon name="mdi:chat-outline" class="text-2xl" />
          </template>
          Fale com a SOS (WhatsApp)
        </UButton>

        <UButton to="/servicos" size="xl" color="primary" variant="ghost" trailing-icon="mdi:arrow-right"
          class="px-8 py-3">
          Ver outros serviços
        </UButton>
      </div>
    </div>
  </div>
</template>
