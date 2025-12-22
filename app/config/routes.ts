/**
 * Centralized Route Configuration
 *
 * This file serves as the single source of truth for all application routes.
 * It drives:
 * - Rail navigation (left icon rail)
 * - Sidebar navigation (collapsible sections)
 * - Command palette search (cmd+k)
 * - Breadcrumb generation
 * - Page metadata (title, description, SEO)
 * - Empty states and placeholders
 *
 * Architecture Benefits:
 * - Single source of truth for navigation
 * - Type-safe route definitions
 * - Automatic generation of navigation components
 * - Consistent metadata across the app
 * - Easier to maintain and update routes
 * - Can generate breadcrumbs automatically
 *
 * Considerations:
 * - Need to keep route definitions in sync with actual page files
 * - Large route trees might need hierarchical organization
 * - Dynamic routes (/:id) need special handling
 * - Permissions/visibility logic can be centralized here
 */

export interface RouteConfig {
  /** The route path (e.g., '/forms/feed') */
  path: string
  /** Display label for the route */
  label: string
  /** Icon name (e.g., 'lucide:home') */
  icon: string
  /** Optional color tint for icon */
  tint?: string
  /** Optional badge text */
  badge?: string | (() => string | number)
  /** Page metadata */
  meta?: {
    /** Page title */
    title?: string
    /** Page description */
    description?: string
    /** SEO title (if different from display title) */
    seoTitle?: string
    /** SEO description */
    seoDescription?: string
    /** Subtitle for Page component */
    subtitle?: string
    /** Subtitle color */
    subtitleColor?: string
    /** Show back button */
    showBackButton?: boolean
    /** Full width page */
    fullWidth?: boolean
  }
  /** Whether this route should appear in rail navigation */
  inRail?: boolean
  /** Rail position: 'primary' | 'secondary' */
  railPosition?: 'primary' | 'secondary'
  /** Whether this route should appear in command palette */
  inCommandPalette?: boolean
  /** Command palette search keywords (for better search) */
  searchKeywords?: string[]
  /** Child routes (for nested navigation) */
  children?: RouteConfig[]
  /** Whether route requires authentication */
  requiresAuth?: boolean
  /** Custom visibility function */
  visible?: () => boolean
  /** Order in navigation (lower = appears first) */
  order?: number
}

/**
 * Hierarchical route configuration
 * Organized by top-level sections
 */
export const routeConfig: RouteConfig[] = [
  {
    path: '/forms',
    label: 'Forms',
    icon: 'lucide:file-text',
    tint: 'text-emerald-300',
    inRail: true,
    railPosition: 'primary',
    order: 1,
    meta: {
      title: 'Forms',
      description: 'Create, manage, and analyze your forms and surveys.',
      subtitle: 'Forms',
      subtitleColor: 'text-emerald-300',
    },
    children: [
      {
        path: '/forms/feed',
        label: 'Live counter',
        icon: 'lucide:loader-2',
        tint: 'text-emerald-300',
        inCommandPalette: true,
        order: 1,
        meta: {
          title: 'Live Counter',
          description: 'A simple counter application built with Nuxt & UI Thing.',
          subtitle: 'Forms',
          subtitleColor: 'text-emerald-300',
        },
      },
      {
        path: '/forms/new',
        label: 'Create form',
        icon: 'lucide:square-plus',
        tint: 'text-sky-300',
        inCommandPalette: true,
        order: 2,
        meta: {
          title: 'Create form',
          description:
            'Placeholder builder canvas. Drop in your drag-and-drop fields, schema editor, or AI scaffolding UI.',
          subtitle: 'Forms',
          subtitleColor: 'text-sky-300',
        },
      },
      {
        path: '/forms/library',
        label: 'Templates',
        icon: 'lucide:library',
        tint: 'text-indigo-300',
        inCommandPalette: true,
        order: 3,
        meta: {
          title: 'Template library',
          description: 'Placeholder gallery for form templates. Wire this to your presets or spaces marketplace.',
          subtitle: 'Forms',
          subtitleColor: 'text-indigo-300',
        },
      },
    ],
  },
  {
    path: '/layouts',
    label: 'Layouts',
    icon: 'lucide:layout-dashboard',
    tint: 'text-violet-300',
    inRail: true,
    railPosition: 'primary',
    order: 2,
    meta: {
      title: 'Layouts',
      description: 'Explore page templates, shells, and reusable UI patterns.',
      subtitle: 'Layouts',
      subtitleColor: 'text-violet-300',
    },
    children: [
      {
        path: '/layouts/templates',
        label: 'Templates',
        icon: 'lucide:layout-grid',
        tint: 'text-violet-300',
        inCommandPalette: true,
        order: 1,
        meta: {
          title: 'Page templates',
          description: 'A collection of ready-to-use page layouts and templates for common UI patterns.',
          subtitle: 'Layouts',
          subtitleColor: 'text-sky-300',
        },
        children: [
          {
            path: '/layouts/templates/dashboard',
            label: 'Dashboard',
            icon: 'lucide:layout-dashboard',
            tint: 'text-blue-300',
            inCommandPalette: true,
            meta: {
              title: 'Dashboard template',
              description: 'Analytics dashboard layout with stats, charts, and data tables.',
              subtitle: 'Templates',
              subtitleColor: 'text-blue-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/pricing',
            label: 'Pricing',
            icon: 'lucide:credit-card',
            tint: 'text-green-300',
            inCommandPalette: true,
            meta: {
              title: 'Pricing template',
              description: 'Pricing page layout with plan comparison and feature lists.',
              subtitle: 'Templates',
              subtitleColor: 'text-green-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/profile',
            label: 'Profile',
            icon: 'lucide:user',
            tint: 'text-purple-300',
            inCommandPalette: true,
            meta: {
              title: 'Profile template',
              description: 'User profile page with avatar, bio, and activity feed.',
              subtitle: 'Templates',
              subtitleColor: 'text-purple-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/settings',
            label: 'Settings',
            icon: 'lucide:settings',
            tint: 'text-gray-300',
            inCommandPalette: true,
            meta: {
              title: 'Settings template',
              description: 'Settings page layout with tabs and form sections.',
              subtitle: 'Templates',
              subtitleColor: 'text-gray-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/landing',
            label: 'Landing page',
            icon: 'lucide:rocket',
            tint: 'text-orange-300',
            inCommandPalette: true,
            meta: {
              title: 'Landing page template',
              description: 'Hero section with features, testimonials, and footer.',
              subtitle: 'Templates',
              subtitleColor: 'text-orange-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/blog',
            label: 'Blog',
            icon: 'lucide:newspaper',
            tint: 'text-blue-300',
            inCommandPalette: true,
            meta: {
              title: 'Blog template',
              description: 'Blog listing with cards, filters, and pagination.',
              subtitle: 'Templates',
              subtitleColor: 'text-blue-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/auth',
            label: 'Authentication',
            icon: 'lucide:lock',
            tint: 'text-purple-300',
            inCommandPalette: true,
            meta: {
              title: 'Authentication template',
              description: 'Login, signup, and password reset forms.',
              subtitle: 'Templates',
              subtitleColor: 'text-purple-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/empty',
            label: 'Empty state',
            icon: 'lucide:inbox',
            tint: 'text-yellow-300',
            inCommandPalette: true,
            meta: {
              title: 'Empty state template',
              description: 'Placeholder for empty data views with action prompts.',
              subtitle: 'Templates',
              subtitleColor: 'text-yellow-300',
              showBackButton: true,
            },
          },
          {
            path: '/layouts/templates/error',
            label: 'Error pages',
            icon: 'lucide:alert-triangle',
            tint: 'text-red-300',
            inCommandPalette: true,
            meta: {
              title: 'Error pages template',
              description: '404, 500, and maintenance page templates.',
              subtitle: 'Templates',
              subtitleColor: 'text-red-300',
              showBackButton: true,
            },
          },
        ],
      },
      {
        path: '/layouts/playground',
        label: 'Playground',
        icon: 'lucide:layout-template',
        tint: 'text-sky-300',
        inCommandPalette: true,
        order: 2,
        meta: {
          title: 'Layout playground',
          description:
            'Placeholder route for layout experiments. Swap in your own sections, grids, and responsive shells here.',
          subtitle: 'Layouts',
          subtitleColor: 'text-sky-300',
        },
      },
      {
        path: '/layouts/shells',
        label: 'Shells',
        icon: 'lucide:panels-top-left',
        tint: 'text-cyan-300',
        inCommandPalette: true,
        order: 3,
        meta: {
          title: 'App shells',
          description: 'Reusable application shell patterns with sidebars, headers, and content areas.',
          subtitle: 'Layouts',
          subtitleColor: 'text-cyan-300',
        },
      },
      {
        path: '/layouts/sections',
        label: 'Sections',
        icon: 'lucide:rows',
        tint: 'text-emerald-300',
        inCommandPalette: true,
        order: 4,
        meta: {
          title: 'Page sections',
          description: 'Modular content sections for building landing pages and feature showcases.',
          subtitle: 'Layouts',
          subtitleColor: 'text-emerald-300',
        },
      },
      {
        path: '/layouts/flow',
        label: 'Flow Editor',
        icon: 'lucide:workflow',
        tint: 'text-rose-300',
        inCommandPalette: true,
        order: 5,
        meta: {
          title: 'Vue Flow Demo',
          description: 'Interactive node-based flow editor with custom nodes, minimap, controls, and background.',
          subtitle: 'Layouts',
          subtitleColor: 'text-rose-300',
        },
      },
    ],
  },
  {
    path: '/tokens',
    label: 'Design tokens',
    icon: 'lucide:swatch-book',
    tint: 'text-indigo-300',
    inRail: true,
    railPosition: 'primary',
    order: 5,
    inCommandPalette: true,
    meta: {
      title: 'Design tokens',
      description: "Explore your design system's colors, typography, and spacing scales.",
      subtitle: 'Design tokens',
      subtitleColor: 'text-indigo-300',
    },
    children: [
      {
        path: '/tokens/colors',
        label: 'Colors',
        icon: 'lucide:palette',
        tint: 'text-pink-300',
        inCommandPalette: true,
        order: 1,
        meta: {
          title: 'Color palette',
          description: 'Design system color tokens including primary, semantic, and neutral scales.',
          subtitle: 'Design tokens',
          subtitleColor: 'text-pink-300',
        },
      },
      {
        path: '/tokens/type',
        label: 'Typography',
        icon: 'lucide:type',
        tint: 'text-amber-300',
        inCommandPalette: true,
        order: 2,
        meta: {
          title: 'Typography kit',
          description:
            'Placeholder specimens for headings, body, labels, and numeric styles. Replace with your type scale.',
          subtitle: 'Design tokens',
          subtitleColor: 'text-amber-300',
        },
      },
    ],
  },
  {
    path: '/activity',
    label: 'Activity',
    icon: 'lucide:activity',
    tint: 'text-orange-300',
    inRail: true,
    railPosition: 'primary',
    order: 3,
    meta: {
      title: 'Activity',
      description: 'Monitor form responses, analytics, and engagement in real-time.',
      subtitle: 'Activity',
      subtitleColor: 'text-orange-300',
    },
    children: [
      {
        path: '/activity/feed',
        label: 'Feed',
        icon: 'lucide:activity',
        tint: 'text-orange-300',
        inCommandPalette: true,
        order: 1,
        meta: {
          title: 'Activity feed',
          description: 'Real-time stream of form submissions, responses, and system events.',
          subtitle: 'Activity',
          subtitleColor: 'text-orange-300',
        },
      },
      {
        path: '/activity/analytics',
        label: 'Analytics',
        icon: 'lucide:chart-line',
        tint: 'text-lime-300',
        inCommandPalette: true,
        order: 2,
        meta: {
          title: 'Analytics dashboard',
          description: 'Visualize response trends, completion rates, and engagement metrics.',
          subtitle: 'Activity',
          subtitleColor: 'text-lime-300',
        },
      },
      {
        path: '/activity/responses',
        label: 'Responses',
        icon: 'lucide:inbox',
        tint: 'text-sky-300',
        badge: '24',
        inCommandPalette: true,
        order: 3,
        meta: {
          title: 'Form responses',
          description: 'Browse and manage all form submissions in one place.',
          subtitle: 'Activity',
          subtitleColor: 'text-sky-300',
        },
      },
    ],
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: 'lucide:settings',
    tint: 'text-purple-300',
    inRail: true,
    railPosition: 'secondary',
    order: 4,
    meta: {
      title: 'Settings',
      description: 'Configure your project, profile, and notification preferences.',
      subtitle: 'Settings',
      subtitleColor: 'text-purple-300',
    },
    children: [
      {
        path: '/settings/project',
        label: 'Project',
        icon: 'lucide:settings',
        tint: 'text-purple-300',
        inCommandPalette: true,
        order: 1,
        meta: {
          title: 'Project settings',
          description: 'Customize your experience with toggles and preferences.',
          subtitle: 'Settings',
          subtitleColor: 'text-purple-300',
        },
      },
      {
        path: '/settings/appearance',
        label: 'Appearance',
        icon: 'lucide:palette',
        tint: 'text-purple-300',
        inCommandPalette: true,
        order: 2,
        meta: {
          title: 'Appearance',
          description: 'Customize the look and feel of your application with themes and display preferences.',
          subtitle: 'Settings',
          subtitleColor: 'text-purple-300',
        },
      },
      {
        path: '/settings/profile',
        label: 'Profile',
        icon: 'lucide:user',
        tint: 'text-sky-300',
        inCommandPalette: true,
        order: 3,
        meta: {
          title: 'Your profile',
          description: 'Manage your account information, avatar, and personal preferences.',
          subtitle: 'Settings',
          subtitleColor: 'text-sky-300',
        },
      },
      {
        path: '/settings/notifications',
        label: 'Notifications',
        icon: 'lucide:bell',
        tint: 'text-pink-300',
        badge: '3',
        inCommandPalette: true,
        order: 4,
        meta: {
          title: 'Notifications',
          description: 'Configure email alerts, push notifications, and in-app messages.',
          subtitle: 'Settings',
          subtitleColor: 'text-pink-300',
        },
      },
    ],
  },
]

/**
 * Flatten route tree for easier access
 * Only includes routes that are actual pages (not parent containers)
 */
export function flattenRoutes(routes: RouteConfig[]): RouteConfig[] {
  const flattened: RouteConfig[] = []

  function traverse(route: RouteConfig) {
    // Recursively process children first
    if (route.children && route.children.length > 0) {
      route.children.forEach(traverse)
    }

    // Only add routes that have a path
    // Skip parent routes that only exist to group children
    // A route is a parent-only if it has children and all children are under its path
    if (route.path) {
      const hasChildren = route.children && route.children.length > 0
      if (!hasChildren) {
        // Leaf node - always include
        flattened.push(route)
      } else {
        // Has children - only include if it's explicitly marked as a page
        // (For now, we'll include all routes with paths, but filter out section headers)
        // Section headers typically don't have inRail, inCommandPalette, etc.
        if (route.inRail || route.inCommandPalette !== false) {
          flattened.push(route)
        }
      }
    }
  }

  routes.forEach(traverse)
  // Final safety check - ensure all routes have paths
  return flattened.filter((route) => route && route.path)
}

/**
 * Get all routes for command palette
 */
export function getCommandPaletteRoutes(): RouteConfig[] {
  return flattenRoutes(routeConfig)
    .filter((route) => route?.path && route.inCommandPalette !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get routes for rail navigation
 */
export function getRailRoutes(position: 'primary' | 'secondary'): RouteConfig[] {
  return flattenRoutes(routeConfig)
    .filter((route) => route?.path && route.inRail && route.railPosition === position)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get sidebar section for a given path
 */
export function getSidebarSection(path: string): RouteConfig | null {
  // Find the section that matches the path prefix
  const sections = routeConfig.filter((section) => path.startsWith(section.path))

  if (sections.length === 0) return null

  // Return the most specific match (longest path)
  return sections.reduce((prev, current) => (current.path.length > prev.path.length ? current : prev))
}

/**
 * Recursively find a route by path in the route config tree
 */
function findRouteByPath(routes: RouteConfig[], targetPath: string): RouteConfig | null {
  for (const route of routes) {
    if (route.path === targetPath) {
      return route
    }
    if (route.children) {
      const found = findRouteByPath(route.children, targetPath)
      if (found) return found
    }
  }
  return null
}

/**
 * Get breadcrumbs for a given path
 * Builds breadcrumbs dynamically from all path segments
 */
export function getBreadcrumbs(path: string): Array<{ label: string; path?: string }> {
  const breadcrumbs: Array<{ label: string; path?: string }> = []

  // Split path into segments (e.g., '/layouts/templates/empty' -> ['layouts', 'templates', 'empty'])
  const segments = path.split('/').filter(Boolean)

  if (segments.length === 0) return breadcrumbs

  // Build breadcrumbs for each path segment
  for (let i = 0; i < segments.length; i++) {
    // Build the path up to this segment
    const segmentPath = '/' + segments.slice(0, i + 1).join('/')

    // Find the route config for this path segment
    const route = findRouteByPath(routeConfig, segmentPath)

    if (route) {
      // Add breadcrumb for this segment
      // Only add path if it's not the last segment (current page)
      const isLastSegment = i === segments.length - 1
      breadcrumbs.push({
        label: route.label,
        path: isLastSegment ? undefined : segmentPath,
      })
    }
  }

  return breadcrumbs
}

/**
 * Get route metadata for a given path
 */
export function getRouteMeta(path: string): RouteConfig['meta'] | null {
  const allRoutes = flattenRoutes(routeConfig)
  const route = allRoutes.find((r) => r.path === path)
  return route?.meta || null
}
