<template>
  <!-- Sidebar: Content frame (matches page header) -->
  <aside
    class="border-border bg-foreground/3 hidden w-64 flex-col border-r px-4 pt-6 pb-4 lg:flex"
    aria-label="Sidebar"
  >
    <!-- Sidebar section items animate per rail route (client-only to avoid hydration mismatches from localStorage/pins) -->
    <ClientOnly>
      <AnimatePresence mode="wait">
        <motion.div
          :key="sidebarSectionKey"
          :initial="{ opacity: 0, x: -8 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -8 }"
          :transition="{ duration: 0.22, ease: 'easeOut' }"
          class="flex min-h-0 flex-1 flex-col"
        >
          <!-- Pinned Section -->
          <div v-if="pinnedItems.length > 0" class="mb-6">
            <button
              type="button"
              class="text-muted-foreground/50 hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
              @click="collapsed.toggleSection('pinned')"
            >
              <Icon
                name="lucide:chevron-down"
                class="mx-2 h-3.5 w-3.5 transition-transform"
                :class="{ '-rotate-90': collapsed.isCollapsed('pinned') }"
              />
              <span class="font-medium">Pinned</span>
            </button>

            <AnimatePresence>
              <motion.ul
                v-if="!collapsed.isCollapsed('pinned')"
                :initial="{ opacity: 0, height: 0 }"
                :animate="{ opacity: 1, height: 'auto' }"
                :exit="{ opacity: 0, height: 0 }"
                :transition="{ duration: 0.2, ease: 'easeOut' }"
                class="mt-3 space-y-1 overflow-hidden text-sm"
              >
                <motion.li
                  v-for="(item, i) in pinnedItems"
                  :key="item?.path || ''"
                  :initial="{ opacity: 0, x: -10 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, x: -10 }"
                  :transition="{ duration: 0.28, ease: 'easeOut', delay: i * 0.035 }"
                >
                  <div class="group relative">
                    <AppNavLink
                      v-if="item?.path"
                      :to="item.path"
                      class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                      :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                    >
                      <Icon :name="item.icon" class="h-4 w-4" />
                      <span class="flex-1">{{ item.label }}</span>
                      <span
                        v-if="routes.getRouteBadge(item)"
                        class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      >
                        {{ routes.getRouteBadge(item) }}
                      </span>
                    </AppNavLink>
                    <button
                      type="button"
                      class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Unpin"
                      @click.stop="pinned.togglePin(item.path)"
                    >
                      <Icon
                        name="lucide:pin"
                        class="h-3.5 w-3.5 fill-current text-muted-foreground hover:text-foreground"
                      />
                    </button>
                  </div>
                </motion.li>
              </motion.ul>
            </AnimatePresence>
          </div>

          <!-- Regular Section -->
          <div>
            <button
              type="button"
              class="text-muted-foreground/50 hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
              @click="collapsed.toggleSection(routes.currentSectionLabel.value)"
            >
              <Icon
                name="lucide:chevron-down"
                class="mx-2 h-3.5 w-3.5 transition-transform"
                :class="{ '-rotate-90': collapsed.isCollapsed(routes.currentSectionLabel.value) }"
              />
              <span class="font-medium">{{ routes.currentSectionLabel.value }}</span>
            </button>

            <AnimatePresence>
              <motion.ul
                v-if="!collapsed.isCollapsed(routes.currentSectionLabel.value)"
                :initial="{ opacity: 0, height: 0 }"
                :animate="{ opacity: 1, height: 'auto' }"
                :exit="{ opacity: 0, height: 0 }"
                :transition="{ duration: 0.2, ease: 'easeOut' }"
                class="mt-3 space-y-1 overflow-hidden text-sm"
              >
                <motion.li
                  v-for="(item, i) in unpinnedItems"
                  :key="item?.path || ''"
                  :initial="{ opacity: 0, x: -10 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, x: -10 }"
                  :transition="{ duration: 0.28, ease: 'easeOut', delay: i * 0.035 }"
                >
                  <div class="group relative">
                    <AppNavLink
                      v-if="item?.path"
                      :to="item.path"
                      class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                      :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                    >
                      <Icon :name="item.icon" class="h-4 w-4" />
                      <span class="flex-1">{{ item.label }}</span>
                      <span
                        v-if="routes.getRouteBadge(item)"
                        class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      >
                        {{ routes.getRouteBadge(item) }}
                      </span>
                    </AppNavLink>
                    <button
                      type="button"
                      class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Pin"
                      @click.stop="pinned.togglePin(item.path)"
                    >
                      <Icon name="lucide:pin" class="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </motion.li>

                <!-- Add New button for editable sections -->
                <motion.li
                  v-if="routes.currentSidebarSection.value?.editable"
                  :initial="{ opacity: 0, x: -10 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.28, ease: 'easeOut', delay: unpinnedItems.length * 0.035 }"
                >
                  <button
                    type="button"
                    class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 transition"
                    @click="handleAddNew"
                  >
                    <Icon name="lucide:plus" class="h-4 w-4" />
                    <span class="flex-1 text-left">Add New</span>
                  </button>
                </motion.li>
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
      <template #fallback>
        <div class="min-h-0 flex-1">
          <div>
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
            >
              <Icon name="lucide:chevron-down" class="mx-2 h-3.5 w-3.5" />
              <span class="font-medium">{{ routes.currentSectionLabel.value }}</span>
            </button>
            <ul class="mt-3 space-y-1 text-sm">
              <li v-for="item in routes.currentSectionLinks.value" :key="item?.path || ''">
                <AppNavLink
                  v-if="item?.path"
                  :to="item.path"
                  class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                  :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                >
                  <Icon :name="item.icon" class="h-4 w-4" />
                  <span class="flex-1">{{ item.label }}</span>
                </AppNavLink>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ClientOnly>

    <!-- Sidebar content -->
    <div class="border-border bg-card rounded-xl border p-3">
      <p class="text-foreground text-xs font-semibold">Quick tip</p>
      <p class="text-muted-foreground mt-1 text-xs leading-relaxed">
        Press Shift + Option + D to open Nuxt DevTools and inspect routes, data, and assets.
      </p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
  import { AnimatePresence, motion } from 'motion-v'

  const routes = useRoutes()
  const pinned = usePinnedItems()
  const collapsed = useCollapsedSections()

  const sidebarSectionKey = computed(() => routes.currentSectionLabel.value)

  // Get pinned items from current section
  const pinnedItems = computed(() => {
    return pinned.getPinnedItems(routes.currentSectionLinks.value)
  })

  // Get unpinned items from current section
  const unpinnedItems = computed(() => {
    return pinned.getUnpinnedItems(routes.currentSectionLinks.value)
  })

  // Handle Add New button click - create collection immediately
  const handleAddNew = async () => {
    const section = routes.currentSidebarSection.value
    if (section?.path === '/collections') {
      const { collections: collectionApi, currentApp } = useDatabase()

      if (!currentApp.value) return

      // Get count for order
      const existingCollections = await collectionApi.list(currentApp.value.id)

      // Create new collection with defaults
      const slug = `untitled-${Date.now()}`
      const collectionId = await collectionApi.create({
        appId: currentApp.value.id,
        title: 'Untitled',
        icon: 'lucide:database',
        slug,
        type: 'database',
        order: existingCollections.length,
        isPublished: false,
        createdBy: 'current-user',
      })

      // Reload sidebar collections
      await routes.reloadCollections()

      // Navigate to new collection
      navigateTo(`/collections/${slug}`)
    }
  }
</script>
