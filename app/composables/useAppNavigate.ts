import { animate } from 'motion-v'

let pageElement: HTMLElement | null = null
let isTransitioning = false
let lastCustomNavigationTime = 0
const CUSTOM_NAV_THRESHOLD = 100 // ms - time window to detect custom navigation

const isPlainLeftClick = (e: MouseEvent) => {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

const performTransition = async (direction: 'forward' | 'back' = 'forward', skipLeave = false) => {
  if (!import.meta.client || !pageElement || isTransitioning) return

  isTransitioning = true
  const el = pageElement

  try {
    if (!skipLeave) {
      // LEAVE: start immediately (no perceived lag)
      el.style.pointerEvents = 'none'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0px)'

      // For back navigation, reverse the direction
      const leaveY = direction === 'back' ? 8 : -8
      const leaveControls = animate(el, { opacity: [1, 0], y: [0, leaveY] }, { duration: 0.2, easing: 'ease-in' })

      // Wait for the leave animation to complete
      await leaveControls.finished

      // Keep wrapper hidden during the swap to prevent any flash
      el.style.opacity = '0'
      el.style.transform = direction === 'back' ? 'translateY(-8px)' : 'translateY(8px)'

      // Wait for route change to complete
      await nextTick()
    } else {
      // For browser navigation, route has already changed, so wait for DOM update
      await nextTick()
    }

    // ENTER: Set initial state and animate in
    el.style.pointerEvents = 'none'
    el.style.opacity = '0'
    el.style.transform = direction === 'back' ? 'translateY(-8px)' : 'translateY(8px)'

    const enterControls = animate(
      el,
      { opacity: [0, 1], y: [direction === 'back' ? -8 : 8, 0] },
      { duration: 0.2, easing: 'ease-out' },
    )

    await enterControls.finished
  } finally {
    if (pageElement) {
      pageElement.style.pointerEvents = ''
      pageElement.style.opacity = ''
      pageElement.style.transform = ''
    }
    isTransitioning = false
  }
}

export const useAppNavigate = () => {
  const router = useRouter()
  const route = useRoute()

  const registerPageElement = (el: HTMLElement | null) => {
    pageElement = el
  }

  const navigate = async (to: string, e?: MouseEvent) => {
    if (e && !isPlainLeftClick(e)) return

    if (!to || to === route.path) return

    // If we're not on the client or we don't have a target element yet, just navigate.
    if (!import.meta.client || !pageElement) {
      await router.push(to)
      return
    }

    // Prevent router churn if user double-clicks.
    if (isTransitioning) return
    isTransitioning = true
    lastCustomNavigationTime = Date.now()

    const el = pageElement

    try {
      // Determine direction based on path depth
      const currentDepth = route.path.split('/').filter(Boolean).length
      const targetDepth = to.split('/').filter(Boolean).length
      const direction: 'forward' | 'back' = targetDepth < currentDepth ? 'back' : 'forward'

      // LEAVE: start immediately (no perceived lag)
      el.style.pointerEvents = 'none'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0px)'

      const leaveY = direction === 'back' ? 8 : -8
      const leaveControls = animate(el, { opacity: [1, 0], y: [0, leaveY] }, { duration: 0.2, easing: 'ease-in' })

      // Wait for the leave animation to complete before changing the route.
      await leaveControls.finished

      // Keep wrapper hidden during the swap to prevent any flash.
      el.style.opacity = '0'
      el.style.transform = direction === 'back' ? 'translateY(-8px)' : 'translateY(8px)'

      await router.push(to)
      await nextTick()

      // ENTER
      el.style.pointerEvents = 'none'
      el.style.opacity = '0'
      el.style.transform = direction === 'back' ? 'translateY(-8px)' : 'translateY(8px)'

      const enterControls = animate(
        el,
        { opacity: [0, 1], y: [direction === 'back' ? -8 : 8, 0] },
        { duration: 0.2, easing: 'ease-out' },
      )

      await enterControls.finished
    } finally {
      if (pageElement) {
        pageElement.style.pointerEvents = ''
        pageElement.style.opacity = ''
        pageElement.style.transform = ''
      }
      isTransitioning = false
    }
  }

  return {
    navigate,
    registerPageElement,
  }
}

// Export function to handle browser navigation
export const handleBrowserNavigation = async (direction: 'forward' | 'back' = 'back') => {
  const now = Date.now()
  const timeSinceCustomNav = now - lastCustomNavigationTime

  // If custom navigation happened recently, skip browser navigation transition
  if (timeSinceCustomNav < CUSTOM_NAV_THRESHOLD) {
    return
  }

  // For browser navigation, route has already changed, so skip leave animation
  await performTransition(direction, true)
}
