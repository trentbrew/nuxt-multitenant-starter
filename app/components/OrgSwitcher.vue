<script lang="ts" setup>
  import type { Organization } from '~/types/database'

  const { organizations: orgApi, currentOrg } = useDatabase()

  const organizations = ref<Organization[]>([])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getPlanLabel = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1) + ' plan'
  }

  const getColorClass = (index: number) => {
    const colors = ['bg-primary text-primary-foreground', 'bg-sky-500 text-white', 'bg-emerald-500 text-white']
    return colors[index % colors.length]
  }

  onMounted(async () => {
    organizations.value = await orgApi.list()
    if (organizations.value.length > 0 && !currentOrg.value) {
      currentOrg.value = organizations.value[0]!
    }
  })

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
          {{ currentOrg ? getInitials(currentOrg.name) : 'OR' }}
        </div>
        <span class="text-foreground text-sm font-medium">{{ currentOrg?.name || 'Select Org' }}</span>
        <Icon name="lucide:chevrons-up-down" class="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      </button>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="start" :side-offset="8" class="w-[232px]">
      <UiDropdownMenuLabel>Organizations</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem v-for="(org, i) in organizations" :key="org.id" class="gap-3" @click="selectOrg(org)">
        <div
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold"
          :class="getColorClass(i)"
        >
          {{ getInitials(org.name) }}
        </div>
        <div class="flex flex-1 flex-col">
          <span class="truncate">{{ org.name }}</span>
          <span class="text-muted-foreground text-xs">{{ getPlanLabel(org.plan) }}</span>
        </div>
        <Icon v-if="org.id === currentOrg?.id" name="lucide:check" class="text-primary h-4 w-4 shrink-0" />
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem icon="lucide:plus">Create organization</UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
