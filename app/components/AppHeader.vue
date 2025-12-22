<script lang="ts" setup>
  const commandDialog = useCommandDialog()
  const routes = useRoutes()
</script>

<template>
  <!-- App Header: Navigation shell (matches icon rail) -->
  <header class="border-border bg-foreground/5 flex h-16 shrink-0 items-center gap-0 border-b p-0">
    <!-- Logo container: part of navigation shell -->
    <div class="flex h-16 w-16 items-center justify-center border-b border-transparent">
      <AppNavLink to="/" class="flex h-9 w-9 items-center justify-center">
        <AppLogo :size="28" color-class="text-primary" />
      </AppNavLink>
    </div>
    <div class="border-border mr-4 -ml-px h-full w-px border-l" />
    <div class="flex items-center">
      <OrgSwitcher />
    </div>
    <span class="text-muted-foreground/50 mx-2">/</span>
    <div class="flex items-center">
      <AppSwitcher />
    </div>
    <nav class="ml-4 flex flex-1 items-center gap-2 text-sm">
      <span class="text-muted-foreground/50 mr-2 -ml-2">/</span>
      <template v-for="(item, i) in routes.breadcrumbs.value" :key="i">
        <template v-if="item?.label">
          <AppNavLink
            v-if="item.path && i !== routes.breadcrumbs.value.length - 1"
            :to="item.path"
            class="text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ item.label }}
          </AppNavLink>
          <span v-else class="text-primary font-medium">{{ item.label }}</span>
          <span v-if="i < routes.breadcrumbs.value.length - 1" class="text-muted-foreground/50 mx-2">/</span>
        </template>
      </template>
    </nav>
    <div class="mr-4 flex items-center">
      <button
        type="button"
        class="text-muted-foreground hover:text-foreground flex h-9 w-64 items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2 text-sm transition-colors hover:bg-background/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        @click="commandDialog.open()"
      >
        <Icon name="lucide:search" class="h-4 w-4 shrink-0 opacity-50" />
        <span class="flex-1 text-left">Search...</span>
        <span class="hidden sm:inline-flex">
          <UiKbd>
            <span class="text-xs">⌘</span>
            K
          </UiKbd>
        </span>
      </button>
    </div>
  </header>
</template>
