<script setup lang="ts">
  import type { Collection } from '~/types/database'

  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits<{
    'update:open': [value: boolean]
    created: [collection: Collection]
  }>()

  const { collections: collectionApi, currentApp } = useDatabase()

  const form = ref({
    title: '',
    icon: 'lucide:file-text',
    type: 'database' as Collection['type'],
    slug: '',
    isPublished: false,
  })

  const pageTypes = [
    { value: 'database', label: 'Database', icon: 'lucide:table', description: 'Structured data with custom fields' },
    {
      value: 'document',
      label: 'Document',
      icon: 'lucide:file-text',
      description: 'Rich text document',
    },
    { value: 'board', label: 'Board', icon: 'lucide:layout-grid', description: 'Kanban-style board' },
    { value: 'calendar', label: 'Calendar', icon: 'lucide:calendar', description: 'Calendar view' },
    { value: 'gallery', label: 'Gallery', icon: 'lucide:image', description: 'Image gallery' },
  ]

  const popularIcons = [
    'lucide:file-text',
    'lucide:table',
    'lucide:layout-grid',
    'lucide:calendar',
    'lucide:image',
    'lucide:folder',
    'lucide:star',
    'lucide:heart',
    'lucide:bookmark',
    'lucide:tag',
    'lucide:users',
    'lucide:settings',
  ]

  const isCreating = ref(false)

  watch(
    () => form.value.title,
    (title) => {
      if (title) {
        form.value.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      }
    },
  )

  const createCollection = async () => {
    if (!currentApp.value || !form.value.title) return

    isCreating.value = true
    try {
      const collectionCount = await collectionApi.list(currentApp.value.id).then((c) => c.length)

      const collectionId = await collectionApi.create({
        appId: currentApp.value.id,
        title: form.value.title,
        icon: form.value.icon,
        type: form.value.type,
        slug: form.value.slug,
        order: collectionCount,
        isPublished: form.value.isPublished,
        createdBy: 'current-user',
      })

      const collection = await collectionApi.get(collectionId as string)
      if (collection) {
        emit('created', collection)
      }

      form.value = {
        title: '',
        icon: 'lucide:file-text',
        type: 'database',
        slug: '',
        isPublished: false,
      }

      emit('update:open', false)
    } finally {
      isCreating.value = false
    }
  }
</script>

<template>
  <UiDialog :open="props.open" @update:open="emit('update:open', $event)">
    <UiDialogContent class="max-w-2xl">
      <UiDialogHeader>
        <UiDialogTitle>Create New Collection</UiDialogTitle>
        <UiDialogDescription>Add a new collection to your application</UiDialogDescription>
      </UiDialogHeader>

      <div class="space-y-6 py-4">
        <!-- Title -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Title</label>
          <UiInput v-model="form.title" placeholder="Collection title" />
        </div>

        <!-- Slug -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Slug</label>
          <UiInput v-model="form.slug" placeholder="collection-slug" />
          <p class="text-muted-foreground text-xs">URL-friendly identifier</p>
        </div>

        <!-- Page Type -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Collection Type</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="type in pageTypes"
              :key="type.value"
              type="button"
              class="border-border hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors"
              :class="{ 'border-primary bg-accent': form.type === type.value }"
              @click="form.type = type.value as Collection['type']"
            >
              <div class="flex items-center gap-2">
                <Icon :name="type.icon" class="h-4 w-4" />
                <span class="text-sm font-medium">{{ type.label }}</span>
              </div>
              <p class="text-muted-foreground text-xs">{{ type.description }}</p>
            </button>
          </div>
        </div>

        <!-- Icon Picker -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Icon</label>
          <div class="grid grid-cols-8 gap-2">
            <button
              v-for="icon in popularIcons"
              :key="icon"
              type="button"
              class="hover:bg-accent flex h-10 w-10 items-center justify-center rounded-md border transition-colors"
              :class="{ 'border-primary bg-accent': form.icon === icon }"
              @click="form.icon = icon"
            >
              <Icon :name="icon" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Published -->
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium">Published</label>
            <p class="text-muted-foreground text-xs">Make this page visible to others</p>
          </div>
          <UiSwitch v-model:checked="form.isPublished" />
        </div>
      </div>

      <UiDialogFooter>
        <UiButton variant="outline" @click="emit('update:open', false)">Cancel</UiButton>
        <UiButton :disabled="!form.title || isCreating" @click="createCollection">
          <Icon v-if="isCreating" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          Create Collection
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
