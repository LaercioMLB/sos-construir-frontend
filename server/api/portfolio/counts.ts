import portfolioData from '~/data/portfolio.json'

const projects = portfolioData as ProjectWork[]

export default defineEventHandler(() => {
  const total = projects.length

  const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  }, {})

  return { total, byCategory }
})
