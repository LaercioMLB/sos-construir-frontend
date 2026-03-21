import Fuse from 'fuse.js'
import blogData from '~/data/blogPosts.json'

const posts = blogData as BlogPost[]
const fuse = new Fuse(posts, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'categories', weight: 0.3 },
    { name: 'summary', weight: 0.2 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
})

const toCard = (post: BlogPost): BlogPostCard => ({
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  coverImage: post.coverImage,
  categories: post.categories,
  date: post.date,
  readingTime: post.readingTime,
})

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(parseInt(query.limit as string) || 10, 50)
  const search = query.search as string | undefined
  const category = query.category as string | undefined

  let filtered: BlogPost[]

  if (search) {
    filtered = fuse.search(search).map((r) => r.item)
  } else {
    filtered = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  if (category) {
    filtered = filtered.filter((p) => p.categories.some((c) => c.slug === category.toLowerCase()))
  }
  const exclude = query.exclude as string | undefined

  if (exclude) {
    filtered = filtered.filter((p) => p.slug !== exclude)
  }
  const total = filtered.length
  const paginated = filtered.slice((page - 1) * limit, page * limit)

  return {
    data: paginated.map(toCard),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sortedBy: search ? 'relevance' : 'date',
    },
  }
})
