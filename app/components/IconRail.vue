<template>
  <!-- Icon Rail: Navigation shell (matches app header) -->
  <nav
    class="border-border flex w-16 flex-col items-center gap-4 border-r bg-foreground/5 px-2 py-4"
    aria-label="Icon rail"
  >
    <template v-for="item in routes.primaryRailRoutes.value" :key="item?.path || ''">
      <AppNavLink
        v-if="item?.path"
        :to="item.path"
        class="group text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
        :class="{
          'bg-primary/15 text-foreground': routes.isRouteActive(item.path),
        }"
        :aria-label="item.label"
      >
        <Icon :name="item.icon" class="h-5 w-5" />
      </AppNavLink>
    </template>

    <div class="mt-auto flex flex-col gap-3">
      <template v-for="item in routes.secondaryRailRoutes.value" :key="item?.path || ''">
        <AppNavLink
          v-if="item?.path"
          :to="item.path"
          class="group text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
          :class="{
            'bg-primary/15 text-foreground': routes.isRouteActive(item.path),
          }"
          :aria-label="item.label"
        >
          <Icon :name="item.icon" class="h-5 w-5" />
        </AppNavLink>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  const routes = useRoutes()
</script>
