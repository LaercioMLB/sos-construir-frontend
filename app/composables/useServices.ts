import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const PAGE_SIZE = 9

export function useServices() {
  const searchQuery = ref('')
  const debouncedSearch = ref('')
  const selectedCategory = ref('todos')
  const visibleCount = ref(PAGE_SIZE)

  const _updateSearch = useDebounceFn((val: string) => {
    debouncedSearch.value = val
  }, 300)

  watch(searchQuery, (newVal) => {
    _updateSearch(newVal)
    visibleCount.value = PAGE_SIZE
  })

  const { data, pending } = useFetch('/api/servicos', {
    query: computed(() => ({
      limit: visibleCount.value,
      category: selectedCategory.value === 'todos' ? undefined : selectedCategory.value,
      search: debouncedSearch.value || undefined,
    })),
  })

  const visibleServices = computed(() => data.value?.data || [])
  const totalServices = computed(() => data.value?.meta?.total || 0)

  const setCategory = (slug: string) => {
    selectedCategory.value = slug
    visibleCount.value = PAGE_SIZE
  }

  const loadMore = () => {
    if (visibleCount.value < totalServices.value) {
      visibleCount.value += PAGE_SIZE
    }
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'todos'
    visibleCount.value = PAGE_SIZE
  }

  const suggestions = ref<Service[]>([])

  const _updateSuggestions = useDebounceFn(async () => {
    const q = searchQuery.value.trim()
    if (q.length < 2) {
      suggestions.value = []
      return
    }

    try {
      const res = await $fetch('/api/servicos', {
        query: { search: q, limit: 6, sortBy: 'popularity', order: 'desc' },
      })

      suggestions.value = res.data
    } catch (error) {
      suggestions.value = []
      throw error
    }
  }, 250)

  watch(searchQuery, _updateSuggestions)

  const clearSearch = () => {
    searchQuery.value = ''
    suggestions.value = []
  }

  return {
    // estadods
    searchQuery,
    selectedCategory,
    visibleCount,
    totalServices,
    pending,

    // dados
    filteredServices: visibleServices,
    visibleServices,
    setCategory,
    loadMore,
    clearFilters,

    // hero e autocomplete
    suggestions,
    clearSearch,
  }
}
