/**
 * Composable for managing pinned sidebar items
 */
export const usePinnedItems = () => {
  const storageKey = 'pinned-sidebar-items'
  const pinnedItems = ref<string[]>([])

  // Load pinned items from localStorage
  const loadPinnedItems = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          pinnedItems.value = JSON.parse(stored)
        }
      } catch (error) {
        console.error('Failed to load pinned items:', error)
      }
    }
  }

  // Save pinned items to localStorage
  const savePinnedItems = () => {
    if (process.client) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(pinnedItems.value))
      } catch (error) {
        console.error('Failed to save pinned items:', error)
      }
    }
  }

  // Check if an item is pinned
  const isPinned = (path: string) => {
    return pinnedItems.value.includes(path)
  }

  // Toggle pin status
  const togglePin = (path: string) => {
    if (isPinned(path)) {
      pinnedItems.value = pinnedItems.value.filter((p) => p !== path)
    } else {
      pinnedItems.value.push(path)
    }
    savePinnedItems()
  }

  // Get pinned items from route config
  const getPinnedItems = (allItems: any[]) => {
    return allItems.filter((item) => item?.path && isPinned(item.path))
  }

  // Get unpinned items
  const getUnpinnedItems = (allItems: any[]) => {
    return allItems.filter((item) => !item?.path || !isPinned(item.path))
  }

  // Initialize on mount
  onMounted(() => {
    loadPinnedItems()
  })

  return {
    pinnedItems: readonly(pinnedItems),
    isPinned,
    togglePin,
    getPinnedItems,
    getUnpinnedItems,
  }
}
