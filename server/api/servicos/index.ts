import baseServicesData from '~/data/services.json'

import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const sortBy = (query.sortBy as keyof Service) || 'popularity'
  const order = query.order === 'asc' ? 'asc' : 'desc'

  const category = query.category as string | undefined
  const search = query.search as string | undefined

  // dados
  const services = baseServicesData.services

  // filtrar
  let filtered = services

  if (category) {
    filtered = filtered.filter((s) => s.category === category)
  }

  if (search) {
    const term = search.toLowerCase()

    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.keywords.some((k) => k.toLowerCase().includes(term))
    )
  }

  // ordenar
  const sortableFields: (keyof Service)[] = ['name', 'category', 'popularity']

  const safeSortBy = sortableFields.includes(sortBy) ? sortBy : 'popularity'

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[safeSortBy]
    const bValue = b[safeSortBy]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // paginar
  const start = (page - 1) * limit
  const end = start + limit
  const paginated = sorted.slice(start, end)

  return {
    data: paginated,
    meta: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  }
})
