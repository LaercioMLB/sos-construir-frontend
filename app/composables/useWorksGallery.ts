export const useWorksGallery = () => {
  const activeFilter = ref('todos')

  const { data: countsData } = useFetch('/api/portfolio/counts')

  const { data, status } = useFetch('/api/portfolio', {
    query: computed(() => ({
      category: activeFilter.value !== 'todos' ? activeFilter.value : undefined,
      limit: 12,
    })),
    watch: [activeFilter],
  })

  const projects = computed<ProjectWork[]>(() => (data.value?.data ?? []) as ProjectWork[])
  const loading = computed(() => status.value === 'pending')

  const rowOne = computed(() => projects.value.slice(0, Math.ceil(projects.value.length / 2)))
  const rowTwo = computed(() => projects.value.slice(Math.ceil(projects.value.length / 2)))

  const getCount = (slug: string) => {
    if (!countsData.value) return 0
    if (slug === 'todos') return countsData.value.total
    return countsData.value.byCategory[slug] ?? 0
  }

  const setFilter = (slug: string) => {
    activeFilter.value = slug
  }

  return { activeFilter, projects, rowOne, rowTwo, loading, setFilter, getCount }
}
