export const usePortfolio = () => {
  const selectedFilter = ref('todos')
  const currentPage = ref(1)
  const limit = 6

  const { data, status } = useFetch('/api/portfolio', {
    query: computed(() => ({
      category: selectedFilter.value !== 'todos' ? selectedFilter.value : undefined,
      page: currentPage.value,
      limit,
    })),
    watch: [selectedFilter, currentPage],
  })

  const projects = computed<ProjectWork[]>(() => (data.value?.data ?? []) as ProjectWork[])
  const total = computed(() => data.value?.meta?.total ?? 0)
  const totalPages = computed(() => data.value?.meta?.totalPages ?? 1)
  const loading = computed(() => status.value === 'pending')

  const setFilter = (slug: string) => {
    selectedFilter.value = slug
    currentPage.value = 1
  }

  return { selectedFilter, currentPage, projects, total, totalPages, loading, limit, setFilter }
}
