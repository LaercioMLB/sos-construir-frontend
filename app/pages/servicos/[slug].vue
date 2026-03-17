<script setup lang="ts">
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

const { data: service, error } = await useFetch<{
  baseService: Service
  pageContent: ServicePage
}>(`/api/servicos/${route.params.slug}`)

if (error.value?.statusCode === 404 || !service.value?.baseService) {
  throw createError({ statusCode: 404, fatal: true })
}

const pageContent = computed<ServicePage | null>(
  () => service.value?.pageContent ?? null
)

if (pageContent.value) {
  useSeoMeta({
    title: pageContent.value.meta.title,
    description: pageContent.value.meta.description,
    keywords: pageContent.value.meta.keywords,
    ogTitle: pageContent.value.meta.title,
    ogDescription: pageContent.value.meta.description,
    ogImage: pageContent.value.meta.ogImage,
    twitterTitle: pageContent.value.meta.title,
    twitterDescription: pageContent.value.meta.description,
    twitterImage: pageContent.value.meta.ogImage,
    twitterCard: 'summary_large_image',
  })
}

const sections = computed(() => {
  if (!pageContent.value) return []

  return layoutOrder
    .map((sectionKey, index) => {
      const data = pageContent.value!.sections[sectionKey]
      if (!data) return null

      return {
        type: sectionKey,
        component: sectionComponents[sectionKey],
        data: {
          ...data,
          bgSection: index === 0 ? undefined : index % 2 === 0 ? 'bg-section-bg-1' : 'bg-section-bg-2',
        },
      }
    })
    .filter(Boolean)
})
</script>

<template>
  <div>
    <PageUnderConstruction v-if="!pageContent" />

    <template v-for="section in sections" :key="section!.type">
      <component :is="section!.component" v-if="section!.component" :section="section!.data" />
    </template>
  </div>
</template>