import {
  flattenRoutes,
  getBreadcrumbs,
  getCommandPaletteRoutes,
  getRailRoutes,
  getRouteMeta,
  getSidebarSection,
  routeConfig,
} from '~/config/routes'
import type { RouteConfig } from '~/config/routes'

/**
 * Composable for accessing route configuration
 */
export const useRoutes = () => {
  const route = useRoute()

  /**
   * Get all routes for command palette
   */
  const commandPaletteRoutes = computed(() => getCommandPaletteRoutes())

  /**
   * Get primary rail routes
   */
  const primaryRailRoutes = computed(() => getRailRoutes('primary'))

  /**
   * Get secondary rail routes
   */
  const secondaryRailRoutes = computed(() => getRailRoutes('secondary'))

  /**
   * Get current sidebar section
   */
  const currentSidebarSection = computed(() => getSidebarSection(route.path))

  /**
   * Dynamic children for collections
   */
  const collectionsChildren = ref<RouteConfig[]>([])

  const loadCollections = async () => {
    if (typeof window === 'undefined') return

    try {
      const { db } = await import('~/lib/database')
      const currentApp = useState<any>('currentApp')

      if (currentApp.value?.id) {
        const collections = await db.collections.where('appId').equals(currentApp.value.id).sortBy('order')

        collectionsChildren.value = collections.map((col) => ({
          path: `/collections/${col.slug}`,
          label: col.title,
          icon: col.icon || 'lucide:database',
          tint: 'text-blue-300',
          meta: {
            title: col.title,
            subtitle: col.type,
            subtitleColor: 'text-blue-300',
          },
        }))
      }
    } catch (error) {
      console.error('Failed to load collections:', error)
    }
  }

  // Load collections when current app changes
  const currentApp = useState<any>('currentApp')
  watch(currentApp, loadCollections, { immediate: true })

  /**
   * Get current section's children (for sidebar)
   */
  const currentSectionLinks = computed(() => {
    const section = currentSidebarSection.value
    if (!section?.children) return []

    // If this is the collections section, merge with dynamic children
    let children = section.children
    if (section.path === '/collections') {
      children = [...collectionsChildren.value, ...section.children]
    }

    return children
      .filter((child) => child?.path && child.visible?.() !== false)
      .sort((a, b) => (a.order || 999) - (b.order || 999))
  })

  /**
   * Get current section label
   */
  const currentSectionLabel = computed(() => {
    return currentSidebarSection.value?.label || 'Navigation'
  })

  /**
   * Get breadcrumbs for current route
   */
  const breadcrumbs = computed(() => getBreadcrumbs(route.path))

  /**
   * Get metadata for current route
   */
  const currentRouteMeta = computed(() => getRouteMeta(route.path))

  /**
   * Check if a route is active
   */
  const isRouteActive = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/')
  }

  /**
   * Get badge value for a route (handles both static and dynamic badges)
   */
  const getRouteBadge = (route: RouteConfig): string | number | undefined => {
    if (!route.badge) return undefined
    if (typeof route.badge === 'function') {
      return route.badge()
    }
    return route.badge
  }

  /**
   * Get all routes (flattened)
   */
  const allRoutes = computed(() => flattenRoutes(routeConfig))

  /**
   * Find a route by path
   */
  const findRoute = (path: string): RouteConfig | undefined => {
    return allRoutes.value.find((r) => r.path === path)
  }

  return {
    // Route data
    allRoutes,
    commandPaletteRoutes,
    primaryRailRoutes,
    secondaryRailRoutes,
    currentSidebarSection,
    currentSectionLinks,
    currentSectionLabel,
    breadcrumbs,
    currentRouteMeta,

    // Utilities
    isRouteActive,
    getRouteBadge,
    findRoute,
    reloadCollections: loadCollections,
  }
}
