export const useBlogList = () => {
  const { data, status } = useFetch('/api/blog', {
    query: { limit: 7 },
  })

  const posts = computed<BlogPostCard[]>(() => (data.value?.data ?? []) as BlogPostCard[])
  const loading = computed(() => status.value === 'pending')

  return { posts, loading }
}
