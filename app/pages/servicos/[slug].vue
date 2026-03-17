<script setup lang="ts">
import type { Service, SectionKey } from '~/types/servicePage'
// TODO: pegar todos os serviços em /data/services.json e e com a slug pegar o conteudo da pagina  diretamente (como se fosse um map) pela servicePages.json 
// se nao tiver nada em servicePages.json, ele gera apenas <SectionPageUnderConstruction>, se nao gera tudo 
import {
  SectionTestimonials,
  SectionServiceHero,
  SectionServicePartnerShowcase,
  SectionWorksGallery,
  SectionOurProcess,
  SectionProfessionals,
  SectionFaq,
  SectionFinalCta,
  SectionWhyChooseUs,
} from '#components'

const route = useRoute()

const sectionComponents: Record<SectionKey, Component> = {
  hero: SectionServiceHero,
  partner: SectionServicePartnerShowcase,
  workGallery: SectionWorksGallery,
  process: SectionOurProcess,
  professionals: SectionProfessionals,
  whyChooseUs: SectionWhyChooseUs,
  faq: SectionFaq,
  finalCta: SectionFinalCta,
  testimonials: SectionTestimonials,
}

const layoutOrder: SectionKey[] = [
  'hero',
  'partner',
  'process',
  'professionals',
  'testimonials',
  'workGallery',
  'whyChooseUs',
  'faq',
  'finalCta',
]

const { data: service } = await useAsyncData<Service | null>(
  `service-${route.params.slug}`,
  async () => {
    const slug = route.params.slug as string

    const { default: servicesData } = await import('~/data/servicesPages.json')

    return (servicesData as Record<string, Service>)[slug] ?? null
  }
)

// Dispara 404 se o serviço não existir no JSON
if (!service.value) {
  throw createError({ statusCode: 404, fatal: true })
}

// Configuração de SEO
useSeoMeta({
  title: service.value.meta.title,
  description: service.value.meta.description,
  keywords: service.value.meta.keywords,
  ogTitle: service.value.meta.title,
  ogDescription: service.value.meta.description,
  ogImage: service.value.meta.ogImage,
  twitterTitle: service.value.meta.title,
  twitterDescription: service.value.meta.description,
  twitterImage: service.value.meta.ogImage,
  twitterCard: 'summary_large_image',
})

// Preparação das seções para renderização
const sections = computed(() => {
  if (!service.value) return []

  return layoutOrder
    .map((sectionKey, index) => {
      const data = service.value?.sections[sectionKey]
      if (!data) return null // Ignora seção se não houver dados no JSON

      return {
        type: sectionKey,
        component: sectionComponents[sectionKey],
        data: {
          ...data,
          bgSection: index === 0 ? undefined : index % 2 === 0 ? 'bg-section-bg-1' : 'bg-section-bg-2',
        },
      }
    })
    .filter(Boolean) // Remove itens nulos do array
})
</script>

<template>
  <div>
    <template v-for="section in sections" :key="section!.type">
      <component :is="section!.component" v-if="section!.component" :section="section!.data" />
    </template>
  </div>
</template>
