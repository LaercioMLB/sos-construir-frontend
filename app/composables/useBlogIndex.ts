export const useBlogIndex = () => {
  const searchQuery = ref('')
  const selectedCategory = ref('todos')
  const currentPage = ref(1)
  const limit = 6

  const { data, status } = useFetch('/api/blog', {
    query: computed(() => ({
      search: searchQuery.value || undefined,
      category: selectedCategory.value !== 'todos' ? selectedCategory.value : undefined,
      page: currentPage.value,
      limit,
    })),
    watch: [searchQuery, selectedCategory, currentPage],
  })

  const posts = computed<BlogPostCard[]>(() => (data.value?.data ?? []) as BlogPostCard[])
  const total = computed(() => data.value?.meta?.total ?? 0)
  const totalPages = computed(() => data.value?.meta?.totalPages ?? 1)
  const loading = computed(() => status.value === 'pending')

  const setCategory = (slug: string) => {
    selectedCategory.value = slug
    currentPage.value = 1
  }

  return {
    searchQuery,
    selectedCategory,
    currentPage,
    posts,
    total,
    totalPages,
    loading,
    limit,
    setCategory,
  }
}
