<script setup lang="ts">
  import type { Collection, DatabaseSchema, DatabaseRecord } from '~/types/database'
  import type { ColumnDef } from '@tanstack/vue-table'

  const route = useRoute()
  const { collections: collectionApi, schemas: schemaApi, records: recordsApi, currentApp } = useDatabase()

  const collection = ref<Collection | null>(null)
  const schema = ref<DatabaseSchema | null>(null)
  const records = ref<DatabaseRecord[]>([])
  const isLoading = ref(true)
  const isSchemaEditorOpen = ref(false)
  const isIconPickerOpen = ref(false)

  const collectionTypes = [
    { value: 'database', label: 'Database', icon: 'lucide:table' },
    { value: 'document', label: 'Document', icon: 'lucide:file-text' },
    { value: 'board', label: 'Board', icon: 'lucide:layout-grid' },
    { value: 'calendar', label: 'Calendar', icon: 'lucide:calendar' },
    { value: 'gallery', label: 'Gallery', icon: 'lucide:image' },
  ] as const

  const loadCollection = async () => {
    if (!currentApp.value) return

    isLoading.value = true
    try {
      const slug = route.params.slug as string
      const foundCollection = await collectionApi.getBySlug(currentApp.value.id, slug)
      collection.value = foundCollection || null

      if (collection.value && collection.value.type === 'database') {
        const foundSchema = await schemaApi.get(collection.value.id)
        schema.value = foundSchema || null

        if (collection.value.id) {
          records.value = await recordsApi.list(collection.value.id)
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  const tableColumns = computed<ColumnDef<DatabaseRecord>[]>(() => {
    if (!schema.value) return []

    return schema.value.fields.map((field) => ({
      accessorKey: `fields.${field.id}`,
      header: field.name,
      cell: ({ row }) => {
        const value = row.original.fields[field.id]
        if (value === undefined || value === null) return '-'
        if (field.type === 'checkbox') return value ? '✓' : '✗'
        if (field.type === 'date') return new Date(value).toLocaleDateString()
        return String(value)
      },
    }))
  })

  const createFirstRecord = async () => {
    if (!collection.value) return

    // If no schema exists, create a default one
    if (!schema.value) {
      isSchemaEditorOpen.value = true
    }
  }

  const addRecord = async () => {
    if (!collection.value || !schema.value) return

    const emptyFields: Record<string, any> = {}
    schema.value.fields.forEach((field) => {
      emptyFields[field.id] = field.type === 'checkbox' ? false : ''
    })

    await recordsApi.create(collection.value.id, emptyFields, 'current-user')
    await loadCollection()
  }

  const handleCellUpdate = async (rowId: string, fieldId: string, value: any) => {
    if (!collection.value) return

    const recordIndex = records.value.findIndex((r) => r.id === rowId)
    if (recordIndex === -1) return

    const originalValue = records.value[recordIndex].fields[fieldId]

    records.value[recordIndex].fields[fieldId] = value

    try {
      await recordsApi.update(rowId, { [fieldId]: value })

      const { $toast } = useNuxtApp()
      $toast?.success('Cell updated successfully')
    } catch (error) {
      records.value[recordIndex].fields[fieldId] = originalValue

      const { $toast } = useNuxtApp()
      $toast?.error('Failed to update cell')

      throw error
    }
  }

  const onSchemaCreated = async () => {
    await loadCollection()
  }

  const updateCollection = async () => {
    if (!collection.value) return

    await collectionApi.update(collection.value.id, {
      title: collection.value.title,
      icon: collection.value.icon,
      isPublished: collection.value.isPublished,
    })

    // Reload sidebar to reflect changes
    const { reloadCollections } = useRoutes()
    await reloadCollections()
  }

  const changeType = async (type: Collection['type']) => {
    if (!collection.value || collection.value.type === type) return

    collection.value.type = type
    await collectionApi.update(collection.value.id, { type })
    await loadCollection()
  }

  watch([currentApp, () => route.params.slug], loadCollection, { immediate: true })

  definePageMeta({
    title: 'Collection',
    icon: 'lucide:database',
  })
</script>

<template>
  <Page :fill-height="true" :full-width="true">
    <template #header>
      <div v-if="collection" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Inline editable icon -->
          <button
            class="bg-accent hover:bg-accent/80 flex h-12 w-12 items-center justify-center rounded-lg transition"
            @click="isIconPickerOpen = true"
          >
            <Icon :name="collection.icon" class="h-6 w-6" />
          </button>

          <!-- Inline editable title -->
          <input
            v-model="collection.title"
            class="bg-transparent text-3xl font-bold outline-none focus:ring-2 focus:ring-primary rounded px-2 -ml-2"
            placeholder="Untitled"
            @blur="updateCollection"
          />
        </div>

        <!-- Published toggle -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Published</span>
          <UiSwitch v-model:checked="collection.isPublished" @update:checked="updateCollection" />
        </div>
      </div>
    </template>

    <div v-if="isLoading" class="flex h-full items-center justify-center">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="!collection" class="flex h-full flex-col items-center justify-center">
      <Icon name="lucide:database-x" class="text-muted-foreground mb-4 h-12 w-12" />
      <h2 class="text-lg font-semibold">Collection not found</h2>
      <p class="text-muted-foreground text-sm">The collection you're looking for doesn't exist.</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Collection type selector -->
      <div class="flex gap-2">
        <button
          v-for="type in collectionTypes"
          :key="type.value"
          class="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition"
          :class="
            collection.type === type.value
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
          "
          @click="changeType(type.value)"
        >
          <Icon :name="type.icon" class="h-4 w-4" />
          {{ type.label }}
        </button>
      </div>

      <!-- Type-specific content -->
      <!-- Database type -->
      <div v-if="collection.type === 'database'">
        <div v-if="!schema" class="rounded-lg border">
          <DataTable :data="[]" :columns="[]" :fields="[]" @add="createFirstRecord" />
        </div>
        <div v-else class="rounded-lg border">
          <DataTable
            :data="records"
            :columns="tableColumns"
            :fields="schema.fields"
            :on-update="handleCellUpdate"
            @add="addRecord"
          />
        </div>
      </div>

      <!-- Document type -->
      <div v-else-if="collection.type === 'document'" class="rounded-lg border bg-card p-8">
        <div class="prose prose-sm max-w-none">
          <p class="text-muted-foreground">Start writing...</p>
        </div>
      </div>

      <!-- Board type -->
      <div v-else-if="collection.type === 'board'" class="rounded-lg border bg-card p-8">
        <div class="flex gap-4">
          <div class="bg-muted flex-1 rounded-lg p-4">
            <h3 class="mb-2 font-semibold">To Do</h3>
            <p class="text-muted-foreground text-sm">Add cards...</p>
          </div>
          <div class="bg-muted flex-1 rounded-lg p-4">
            <h3 class="mb-2 font-semibold">In Progress</h3>
            <p class="text-muted-foreground text-sm">Add cards...</p>
          </div>
          <div class="bg-muted flex-1 rounded-lg p-4">
            <h3 class="mb-2 font-semibold">Done</h3>
            <p class="text-muted-foreground text-sm">Add cards...</p>
          </div>
        </div>
      </div>

      <!-- Calendar type -->
      <div v-else-if="collection.type === 'calendar'" class="rounded-lg border bg-card p-8">
        <p class="text-muted-foreground text-sm">Calendar view coming soon...</p>
      </div>

      <!-- Gallery type -->
      <div v-else-if="collection.type === 'gallery'" class="rounded-lg border bg-card p-8">
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-muted aspect-square rounded-lg"></div>
          <div class="bg-muted aspect-square rounded-lg"></div>
          <div class="bg-muted aspect-square rounded-lg"></div>
          <div class="bg-muted aspect-square rounded-lg"></div>
        </div>
      </div>

      <!-- Schema Editor Modal -->
      <SchemaEditorModal
        v-if="collection"
        v-model:open="isSchemaEditorOpen"
        :page-id="collection.id"
        :schema="schema"
        @created="onSchemaCreated"
      />
    </div>
  </Page>
</template>
