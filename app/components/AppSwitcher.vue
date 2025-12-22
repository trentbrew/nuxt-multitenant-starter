<script lang="ts" setup>
  interface Application {
    id: string
    name: string
    initials: string
    type: string
    color: string
  }

  const applications = ref<Application[]>([
    {
      id: '1',
      name: 'Filegraph',
      initials: 'FG',
      type: 'Workspace app',
      color: 'bg-primary text-primary-foreground',
    },
    {
      id: '2',
      name: 'Markform',
      initials: 'MF',
      type: 'Analytics app',
      color: 'bg-sky-500 text-white',
    },
    {
      id: '3',
      name: 'Nodebook',
      initials: 'NB',
      type: 'Library app',
      color: 'bg-emerald-500 text-white',
    },
  ])

  const currentApp = ref<Application>(applications.value[0]!)

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
          {{ currentApp.initials }}
        </div>
        <span class="text-foreground text-sm font-medium">{{ currentApp.name }}</span>
        <Icon name="lucide:chevrons-up-down" class="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      </button>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="start" :side-offset="8" class="w-[232px]">
      <UiDropdownMenuLabel>Applications</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem v-for="app in applications" :key="app.id" class="gap-3" @click="selectApp(app)">
        <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold" :class="app.color">
          {{ app.initials }}
        </div>
        <span class="flex-1 truncate">{{ app.name }}</span>
        <Icon v-if="app.id === currentApp.id" name="lucide:check" class="text-primary h-4 w-4 shrink-0" />
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem icon="lucide:plus">Create application</UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
