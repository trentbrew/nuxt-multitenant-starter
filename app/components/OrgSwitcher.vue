<script lang="ts" setup>
  interface Organization {
    id: string
    name: string
    initials: string
    plan: string
    color: string
  }

  const organizations = ref<Organization[]>([
    {
      id: '1',
      name: 'Turtle Labs',
      initials: 'TL',
      plan: 'Pro plan',
      color: 'bg-primary text-primary-foreground',
    },
    {
      id: '2',
      name: 'Toolkit',
      initials: 'TK',
      plan: 'Free plan',
      color: 'bg-sky-500 text-white',
    },
    {
      id: '3',
      name: 'Personal',
      initials: 'PR',
      plan: 'Free plan',
      color: 'bg-emerald-500 text-white',
    },
  ])

  const currentOrg = ref<Organization>(organizations.value[0]!)

  const selectOrg = (org: Organization) => {
    currentOrg.value = org
  }
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <button class="hover:bg-accent/10 flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition">
        <div
          class="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold"
        >
          {{ currentOrg.initials }}
        </div>
        <span class="text-foreground text-sm font-medium">{{ currentOrg.name }}</span>
        <Icon name="lucide:chevrons-up-down" class="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      </button>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="start" :side-offset="8" class="w-[232px]">
      <UiDropdownMenuLabel>Organizations</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem v-for="org in organizations" :key="org.id" class="gap-3" @click="selectOrg(org)">
        <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold" :class="org.color">
          {{ org.initials }}
        </div>
        <span class="flex-1 truncate">{{ org.name }}</span>
        <Icon v-if="org.id === currentOrg.id" name="lucide:check" class="text-primary h-4 w-4 shrink-0" />
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem icon="lucide:plus">Create organization</UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
