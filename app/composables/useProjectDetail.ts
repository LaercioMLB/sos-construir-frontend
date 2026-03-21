export const useProjectDetail = (id: string) => {
  const { data: projectData, error } = useFetch<ProjectDetail>(`/api/portfolio/${id}`)

  const project = projectData as Ref<ProjectDetail>

  const { data: allProjects } = useFetch('/api/portfolio', {
    query: { limit: 3, exclude: id },
  })

  const relatedProjects = computed<ProjectWork[]>(
    () => (allProjects.value?.data ?? []) as ProjectWork[]
  )

  return { project, relatedProjects, error }
}
