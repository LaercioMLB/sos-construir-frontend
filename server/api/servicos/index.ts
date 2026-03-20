import Fuse from 'fuse.js'
import baseServicesData from '~/data/services.json'

const services = baseServicesData.services as Service[]

const fuse = new Fuse(services, {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'keywords', weight: 0.3 },
    { name: 'description', weight: 0.2 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  useExtendedSearch: true,
})

const sortableFields: (keyof Service)[] = ['name', 'category', 'popularity']

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(parseInt(query.limit as string) || 10, 50)

  const requestedSort = query.sortBy as keyof Service
  const sortBy = sortableFields.includes(requestedSort) ? requestedSort : 'popularity'

  const order = query.order === 'asc' ? 'asc' : 'desc'
  const category = query.category as string | undefined
  const search = query.search as string | undefined

  let filtered: Service[]
  // filtro
  if (search) {
    filtered = fuse.search(search).map((r) => r.item)
  } else {
    filtered = services
  }

  if (category) {
    filtered = filtered.filter((s) => s.category === category)
  }

  if (!search) {
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  // paginacao
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    data: paginated,
    meta: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      sortedBy: search ? 'relevance' : sortBy,
    },
  }
})
