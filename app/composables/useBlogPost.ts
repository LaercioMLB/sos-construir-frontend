export const useBlogPost = (slug: string) => {
  const { data: postData, error } = useFetch<BlogPost>(`/api/blog/${slug}`)

  const { data: relatedPostsData } = useFetch('/api/blog', {
    query: { limit: 3, exclude: slug },
  })

  const post = computed(() => postData.value ?? null)

  const relatedPosts = computed<RelatedPost[]>(() =>
    ((relatedPostsData.value?.data ?? []) as BlogPostCard[]).map((p) => ({
      title: p.title,
      slug: p.slug,
      readingTime: p.readingTime,
      image: p.coverImage,
    }))
  )

  return { post, relatedPosts, error }
}
