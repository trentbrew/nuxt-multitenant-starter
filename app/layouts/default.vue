<template>
  <!-- Root: base layer -->
  <div class="bg-background text-foreground flex h-dvh flex-col">
    <AppHeader />

    <!-- Command Dialog -->
    <UiCommandDialog
      :open="commandDialog.isOpen.value"
      title="Command Palette"
      description="Search for pages and navigate quickly"
      @update:open="(val) => (commandDialog.isOpen.value = val)"
    >
      <UiCommandInput placeholder="Search pages..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="group in commandPaletteGroups" :key="group.label">
          <UiCommandGroup :heading="group.label">
            <template v-for="routeItem in group.routes" :key="routeItem?.path || ''">
              <UiCommandItem
                v-if="routeItem?.path"
                :value="`${group.label} ${routeItem.label}`"
                @select="() => navigateTo(routeItem.path)"
              >
                <Icon :name="routeItem.icon" class="h-4 w-4" />
                <span>{{ routeItem.label }}</span>
                <UiCommandShortcut v-if="routes.getRouteBadge(routeItem)">
                  {{ routes.getRouteBadge(routeItem) }}
                </UiCommandShortcut>
              </UiCommandItem>
            </template>
          </UiCommandGroup>
        </template>
      </UiCommandList>
    </UiCommandDialog>

    <div class="flex flex-1 overflow-hidden">
      <IconRail />
      <AppSidebar />

      <main
        ref="pageEl"
        class="page-transition-wrapper bg-transparent flex-1 overflow-y-auto p-0"
        aria-label="Main content"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAppNavigate } from '~/composables/useAppNavigate'
  import { getSidebarSection } from '~/config/routes'

  const commandDialog = useCommandDialog()
  const routes = useRoutes()
  const appNavigate = useAppNavigate()
  const pageEl = ref<HTMLElement | null>(null)

  // Register the page element for transitions
  onMounted(() => {
    if (pageEl.value) {
      appNavigate.registerPageElement(pageEl.value)
    }
  })

  onBeforeUnmount(() => {
    appNavigate.registerPageElement(null)
  })

  const navigateTo = async (path: string) => {
    await appNavigate.navigate(path)
    commandDialog.close()
  }

  // Group command palette routes by section for better organization
  const commandPaletteGroups = computed(() => {
    const groups = new Map<string, typeof routes.commandPaletteRoutes.value>()

    routes.commandPaletteRoutes.value.forEach((routeItem) => {
      const section = getSidebarSection(routeItem.path)
      const sectionLabel = section?.label || 'Other'

      if (!groups.has(sectionLabel)) {
        groups.set(sectionLabel, [])
      }
      groups.get(sectionLabel)!.push(routeItem)
    })

    return Array.from(groups.entries()).map(([label, routeItems]) => ({
      label,
      routes: routeItems,
    }))
  })
</script>
