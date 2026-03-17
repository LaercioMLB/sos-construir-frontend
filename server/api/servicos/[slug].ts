import baseServicesData from '~/data/services.json'
import pagesData from '~/data/servicesPages.json'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  const baseServices = baseServicesData.services
  const baseService = baseServices.find((s) => s.slug === slug) || null
  const pageContent = (pagesData as Record<string, ServicePage>)[slug!] ?? null

  if (!baseService) {
    throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado' })
  }

  return {
    baseService,
    pageContent,
  }
})
