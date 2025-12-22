<script setup lang="ts">
  definePageMeta({
    title: 'Notifications',
    icon: 'lucide:bell',
  })
</script>

<template>
  <Page
    title="Notifications"
    subtitle="Activity"
    subtitle-color="text-orange-300"
    description="View and manage your notifications and alerts"
    icon="lucide:bell"
    :hide-sidebar="true"
    :fill-height="true"
  >
    <div class="flex h-full items-center justify-center">
      <div class="text-center">
        <Icon name="lucide:bell" class="text-muted-foreground mx-auto mb-4 h-16 w-16" />
        <h2 class="mb-2 text-2xl font-bold">Coming Soon</h2>
        <p class="text-muted-foreground">Real-time notifications and activity feed</p>
      </div>
    </div>
  </Page>
</template>
