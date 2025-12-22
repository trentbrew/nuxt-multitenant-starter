<template>
  <div class="flex h-full">
    <!-- Secondary Sidebar (optional) -->
    <aside v-if="$slots.sidebar && !hideSidebar" class="w-64 shrink-0 border-r border-border bg-card">
      <slot name="sidebar" />
    </aside>

    <!-- Main Page Content -->
    <div :class="finalContainerClass" class="flex-1">
      <!-- Main content uses base background (darkest layer) -->
      <div :class="contentWrapperClass + ' bg-background'">
        <!-- Header Section -->
        <div
          v-if="subtitle || title || description || $slots.header"
          class="sticky top-0 z-10 shrink-0 space-y-2 bg-background"
        >
          <div class="bg-background border-b border-border p-6 pl-8 backdrop-blur-xl">
            <!-- Subtitle with optional back button and icon -->
            <div class="flex items-center justify-between mb-2">
              <div v-if="subtitle || showBackButton || icon" class="inline-flex items-center gap-0">
                <BackButton v-if="showBackButton" />
                <Icon v-if="icon" :name="icon" :class="`${iconClass} ${subtitleColor} mr-2`" />
                <p v-if="subtitle" :class="['text-xs uppercase tracking-wide', subtitleColor || 'text-primary']">
                  {{ subtitle }}
                </p>
              </div>

              <!-- Width Toggle Button (Notion-style) - ClientOnly to avoid hydration mismatch -->
              <ClientOnly>
                <UiTooltip v-if="showWidthToggle">
                  <UiTooltipTrigger as-child>
                    <button
                      type="button"
                      class="text-muted-foreground hover:text-foreground hover:bg-foreground/10 flex h-8 w-8 items-center justify-center rounded-lg transition"
                      @click="toggleWidth"
                    >
                      <Icon :name="isFullWidth ? 'lucide:minimize-2' : 'lucide:maximize-2'" class="h-4 w-4" />
                    </button>
                  </UiTooltipTrigger>
                  <UiTooltipContent side="left">
                    {{ isFullWidth ? 'Narrow width' : 'Full width' }}
                  </UiTooltipContent>
                </UiTooltip>
                <template #fallback>
                  <div v-if="showWidthToggle" class="h-8 w-8" />
                </template>
              </ClientOnly>
            </div>

            <!-- Title -->
            <h1 v-if="title || $slots.title" class="text-foreground text-3xl font-semibold mb-2">
              <slot name="title">{{ title }}</slot>
            </h1>
            <!-- Description -->
            <p v-if="description || $slots.description" class="text-muted-foreground max-w-2xl text-sm">
              <slot name="description">{{ description }}</slot>
            </p>
            <!-- Custom header slot -->
            <slot name="header" />
          </div>

          <!-- Metadata / Actions Row -->
          <div v-if="metadata || $slots.metadata || $slots.actions" class="flex flex-wrap items-center gap-4 pt-2">
            <div v-if="metadata || $slots.metadata" class="flex items-center gap-2">
              <slot name="metadata">
                <template v-if="Array.isArray(metadata)">
                  <span
                    v-for="(item, i) in metadata"
                    :key="i"
                    class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {{ item }}
                  </span>
                </template>
                <span
                  v-else-if="metadata"
                  class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ metadata }}
                </span>
              </slot>
            </div>
            <div v-if="$slots.actions" class="ml-auto">
              <slot name="actions" />
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div v-if="$slots.default" :class="[contentClass, fillHeight ? 'min-h-0 flex-1 overflow-auto' : 'p-6 pt-0']">
          <slot :is-full-width="isFullWidth" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface PageProps {
    /** The page title */
    title?: string
    /** Subtitle text (displayed above title) */
    subtitle?: string
    /** Color class for subtitle (e.g., 'text-sky-300', 'text-purple-300') */
    subtitleColor?: string
    /** Description text (displayed below title) */
    description?: string
    /** Icon name to display next to subtitle */
    icon?: string
    /** Icon color class */
    iconClass?: string
    /** Show back button */
    showBackButton?: boolean
    /** Metadata/badges to display */
    metadata?: string | string[]
    /** Custom class for the container */
    containerClass?: string
    /** Custom class for the content area */
    contentClass?: string
    /** SEO title (if different from display title) */
    seoTitle?: string
    /** SEO description (if different from display description) */
    seoDescription?: string
    /** Initial full width state (user can toggle) */
    fullWidth?: boolean
    /** Show the width toggle button */
    showWidthToggle?: boolean
    /** Fill available height (content scrolls within) */
    fillHeight?: boolean
    /** Hide the sidebar even if sidebar slot has content */
    hideSidebar?: boolean
  }

  const props = withDefaults(defineProps<PageProps>(), {
    showBackButton: false,
    containerClass: '',
    contentClass: '',
    fullWidth: true,
    showWidthToggle: true,
    fillHeight: false,
    hideSidebar: false,
  })

  const route = useRoute()

  // Storage key based on route path
  const storageKey = computed(() => `page-width:${route.path}`)

  // Initialize from localStorage or prop default
  // Always start with prop default to ensure SSR/client consistency
  const isFullWidth = ref(props.fullWidth)

  // Load preference from localStorage after hydration completes (client-only)
  onMounted(() => {
    if (import.meta.client) {
      // Wait for next tick to ensure hydration is complete
      nextTick(() => {
        const stored = localStorage.getItem(storageKey.value)
        if (stored !== null) {
          isFullWidth.value = stored === 'true'
        }
      })
    }
  })

  // Toggle width and persist preference
  function toggleWidth() {
    isFullWidth.value = !isFullWidth.value
    if (import.meta.client) {
      localStorage.setItem(storageKey.value, String(isFullWidth.value))
    }
  }

  // Container class - layout handles outer padding, this just handles width mode
  const finalContainerClass = computed(() => {
    const base = props.containerClass || ''
    const heightClass = props.fillHeight ? 'h-full' : ''

    if (isFullWidth.value) {
      // Full width: no additional constraints
      return `${base} ${heightClass}`.trim()
    }
    // Narrow mode: add horizontal padding for centered content
    return `${base} ${heightClass} px-4 sm:px-6`.trim()
  })

  // Content wrapper class based on width preference
  const contentWrapperClass = computed(() => {
    const heightClass = props.fillHeight ? 'flex h-full flex-col' : ''
    const spacingClass = props.fillHeight ? 'gap-6' : 'space-y-6'

    if (isFullWidth.value) {
      return `w-full ${spacingClass} ${heightClass}`.trim()
    }
    return `mx-auto max-w-4xl ${spacingClass} ${heightClass}`.trim()
  })

  // Handle SEO meta reactively
  const seoTitle = computed(() => props.seoTitle || props.title)
  const seoDesc = computed(() => props.seoDescription || props.description)

  watchEffect(() => {
    if (seoTitle.value || seoDesc.value) {
      useSeoMeta({
        title: seoTitle.value,
        description: seoDesc.value,
        ogTitle: seoTitle.value,
        ogDescription: seoDesc.value,
        twitterTitle: seoTitle.value,
        twitterDescription: seoDesc.value,
        twitterCard: 'summary_large_image',
      })

      // Set OG image if title and description are available
      if (seoTitle.value && seoDesc.value) {
        defineOgImageComponent('Site', {
          title: seoTitle.value,
          description: seoDesc.value,
        })
      }
    }
  })
</script>
