<script setup lang="ts">
  import type { DatabaseSchema, DatabaseField } from '~/types/database'

  const props = defineProps<{
    open: boolean
    pageId: string
    schema?: DatabaseSchema | null
  }>()

  const emit = defineEmits<{
    'update:open': [value: boolean]
    created: [schema: DatabaseSchema]
  }>()

  const { schemas: schemaApi } = useDatabase()

  const localSchema = ref<DatabaseSchema>({
    id: '',
    collectionId: props.pageId,
    fields: [],
    views: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })

  // Initialize default view
  onMounted(() => {
    if (!props.schema && localSchema.value.views.length === 0) {
      localSchema.value.views = [
        {
          id: crypto.randomUUID(),
          name: 'All Records',
          type: 'table' as const,
          filters: [],
          sorts: [],
          isDefault: true,
        },
      ]
    }
  })

  watch(
    () => props.schema,
    (newSchema) => {
      if (newSchema) {
        localSchema.value = { ...newSchema }
      }
    },
    { immediate: true },
  )

  const isSaving = ref(false)

  const saveSchema = async () => {
    isSaving.value = true
    try {
      // Deep clone to plain JSON to remove any Vue reactivity proxies
      const plainFields = JSON.parse(JSON.stringify(localSchema.value.fields))
      const plainViews = JSON.parse(JSON.stringify(localSchema.value.views))

      if (localSchema.value.id) {
        await schemaApi.update(localSchema.value.id, {
          ...localSchema.value,
          fields: plainFields,
          views: plainViews,
        })
      } else {
        const schemaId = await schemaApi.create({
          collectionId: props.pageId,
          fields: plainFields,
          views: plainViews,
        })
        localSchema.value.id = schemaId as string
      }

      emit('created', localSchema.value)
      emit('update:open', false)
    } finally {
      isSaving.value = false
    }
  }
</script>

<template>
  <UiDialog :open="props.open" @update:open="emit('update:open', $event)">
    <UiDialogContent class="max-w-3xl max-h-[80vh] flex flex-col">
      <UiDialogHeader>
        <UiDialogTitle>{{ schema ? 'Edit' : 'Create' }} Database Schema</UiDialogTitle>
        <UiDialogDescription>Define the structure and fields for your database</UiDialogDescription>
      </UiDialogHeader>

      <div class="flex-1 overflow-y-auto py-4">
        <DataTableSchemaEditor :schema="localSchema" @update="localSchema = $event" />
      </div>

      <UiDialogFooter>
        <UiButton variant="outline" @click="emit('update:open', false)">Cancel</UiButton>
        <UiButton :disabled="localSchema.fields.length === 0 || isSaving" @click="saveSchema">
          <Icon v-if="isSaving" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          {{ schema ? 'Save Changes' : 'Create Schema' }}
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
