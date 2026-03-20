import blogData from '~/data/blogPosts.json'

const blogMap = Object.fromEntries((blogData as BlogPost[]).map((post) => [post.slug, post]))

export default defineEventHandler((event): BlogPost => {
  const slug = getRouterParam(event, 'slug')
  const post = blogMap[slug!]

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post não encontrado' })
  }

  return post
})
