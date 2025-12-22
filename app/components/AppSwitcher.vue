<script lang="ts" setup>
  import type { Application } from '~/types/database'

  const { applications: appApi, currentOrg, currentApp } = useDatabase()

  const applications = ref<Application[]>([])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getColorClass = (color: string) => {
    return color + ' text-white'
  }

  watch(
    currentOrg,
    async (org) => {
      if (org) {
        applications.value = await appApi.list(org.id)
        if (applications.value.length > 0 && !currentApp.value) {
          currentApp.value = applications.value[0]!
        }
      }
    },
    { immediate: true },
  )

  const selectApp = (app: Application) => {
    currentApp.value = app
  }
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <button class="hover:bg-accent/10 flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition">
        <div
          class="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold"
        >
          {{ currentApp ? getInitials(currentApp.name) : 'AP' }}
        </div>
        <span class="text-foreground text-sm font-medium">{{ currentApp?.name || 'Select App' }}</span>
        <Icon name="lucide:chevrons-up-down" class="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      </button>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="start" :side-offset="8" class="w-[232px]">
      <UiDropdownMenuLabel>Applications</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem v-for="app in applications" :key="app.id" class="gap-3" @click="selectApp(app)">
        <div
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold"
          :class="getColorClass(app.color)"
        >
          {{ getInitials(app.name) }}
        </div>
        <div class="flex flex-1 flex-col">
          <span class="truncate">{{ app.name }}</span>
          <span class="text-muted-foreground text-xs">{{ app.description }}</span>
        </div>
        <Icon v-if="app.id === currentApp?.id" name="lucide:check" class="text-primary h-4 w-4 shrink-0" />
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem icon="lucide:plus">Create application</UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
