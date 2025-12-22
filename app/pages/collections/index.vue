<script setup lang="ts">
  definePageMeta({
    title: 'Collections',
    icon: 'lucide:database',
  })
</script>

<template>
  <Page
    title="Collections"
    subtitle="Database"
    subtitle-color="text-blue-300"
    description="Create and manage custom databases with flexible schemas"
    icon="lucide:database"
    :fill-height="true"
    :full-width="true"
  >
    <div class="flex h-full items-center justify-center">
      <div class="text-center">
        <Icon name="lucide:database" class="text-muted-foreground mx-auto mb-4 h-16 w-16" />
        <h2 class="mb-2 text-2xl font-bold">Collections</h2>
        <p class="text-muted-foreground mb-4">Select a collection from the sidebar or create a new one</p>
      </div>
    </div>
  </Page>
</template>
