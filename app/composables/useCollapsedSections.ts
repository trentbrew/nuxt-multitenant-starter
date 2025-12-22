/**
 * Composable for managing collapsed sidebar sections
 */
export const useCollapsedSections = () => {
  const storageKey = 'collapsed-sidebar-sections'
  const collapsedSections = ref<Set<string>>(new Set())

  // Load collapsed sections from localStorage
  const loadCollapsedSections = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const sections = JSON.parse(stored)
          collapsedSections.value = new Set(sections)
        }
      } catch (error) {
        console.error('Failed to load collapsed sections:', error)
      }
    }
  }

  // Save collapsed sections to localStorage
  const saveCollapsedSections = () => {
    if (process.client) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(collapsedSections.value)))
      } catch (error) {
        console.error('Failed to save collapsed sections:', error)
      }
    }
  }

  // Check if a section is collapsed
  const isCollapsed = (sectionId: string) => {
    return collapsedSections.value.has(sectionId)
  }

  // Toggle section collapse state
  const toggleSection = (sectionId: string) => {
    if (isCollapsed(sectionId)) {
      collapsedSections.value.delete(sectionId)
    } else {
      collapsedSections.value.add(sectionId)
    }
    saveCollapsedSections()
  }

  // Initialize on mount
  onMounted(() => {
    loadCollapsedSections()
  })

  return {
    isCollapsed,
    toggleSection,
  }
}
