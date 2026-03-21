import portfolioData from '~/data/portfolio.json'

const projects = portfolioData as ProjectWork[]

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(parseInt(query.limit as string) || 12, 50)
  const category = query.category as string | undefined

  let filtered = category
    ? projects.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : projects

  const exclude = query.exclude as string | undefined
  if (exclude) {
    filtered = filtered.filter((p) => String(p.id) !== exclude)
  }

  const total = filtered.length
  const paginated = filtered.slice((page - 1) * limit, page * limit)

  return {
    data: paginated,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
})
