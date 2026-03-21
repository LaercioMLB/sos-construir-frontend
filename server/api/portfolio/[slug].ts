import portfolioData from '~/data/portfolioDetails.json'

const projectMap = Object.fromEntries(
  (portfolioData as ProjectDetail[]).map((p) => [String(p.id), p])
)

export default defineEventHandler((event): ProjectDetail => {
  const id = getRouterParam(event, 'slug')
  const project = projectMap[id!] ?? null

  if (!project) {
    throw createError({ statusCode: 404, message: 'Projeto não encontrado' })
  }

  return project
})
