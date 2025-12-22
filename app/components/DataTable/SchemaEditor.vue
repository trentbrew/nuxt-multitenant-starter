<script setup lang="ts">
  import type { DatabaseSchema, DatabaseField } from '~/types/database'

  const props = defineProps<{
    schema: DatabaseSchema
  }>()

  const emit = defineEmits<{
    update: [schema: DatabaseSchema]
  }>()

  const fieldTypes = [
    { value: 'text', label: 'Text', icon: 'lucide:type' },
    { value: 'number', label: 'Number', icon: 'lucide:hash' },
    { value: 'select', label: 'Select', icon: 'lucide:list' },
    { value: 'multiselect', label: 'Multi-select', icon: 'lucide:list-checks' },
    { value: 'date', label: 'Date', icon: 'lucide:calendar' },
    { value: 'checkbox', label: 'Checkbox', icon: 'lucide:check-square' },
    { value: 'url', label: 'URL', icon: 'lucide:link' },
    { value: 'email', label: 'Email', icon: 'lucide:mail' },
    { value: 'file', label: 'File', icon: 'lucide:paperclip' },
  ]

  const addField = () => {
    const newField: DatabaseField = {
      id: crypto.randomUUID(),
      name: 'New Field',
      type: 'text',
      required: false,
      order: props.schema.fields.length,
    }

    emit('update', {
      ...props.schema,
      fields: [...props.schema.fields, newField],
    })
  }

  const updateField = (fieldId: string, updates: Partial<DatabaseField>) => {
    emit('update', {
      ...props.schema,
      fields: props.schema.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
    })
  }

  const deleteField = (fieldId: string) => {
    emit('update', {
      ...props.schema,
      fields: props.schema.fields.filter((f) => f.id !== fieldId),
    })
  }
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold">Database Schema</h3>
        <p class="text-muted-foreground text-sm">Define the structure of your database</p>
      </div>
      <UiButton size="sm" @click="addField">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Add Field
      </UiButton>
    </div>

    <div class="space-y-2">
      <div
        v-for="field in schema.fields"
        :key="field.id"
        class="hover:bg-accent/50 group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors"
      >
        <Icon name="lucide:grip-vertical" class="text-muted-foreground h-4 w-4 cursor-move" />

        <div class="flex-1 space-y-2">
          <div class="flex items-center gap-2">
            <UiInput
              :model-value="field.name"
              placeholder="Field name"
              class="flex-1"
              @update:model-value="updateField(field.id, { name: $event })"
            />

            <UiSelect
              :model-value="field.type"
              @update:model-value="updateField(field.id, { type: $event as DatabaseField['type'] })"
            >
              <UiSelectTrigger class="w-[180px]">
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="type in fieldTypes" :key="type.value" :value="type.value">
                  <div class="flex items-center gap-2">
                    <Icon :name="type.icon" class="h-4 w-4" />
                    {{ type.label }}
                  </div>
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>

            <UiButton
              variant="ghost"
              size="icon"
              class="opacity-0 group-hover:opacity-100"
              @click="deleteField(field.id)"
            >
              <Icon name="lucide:trash-2" class="h-4 w-4" />
            </UiButton>
          </div>

          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <UiCheckbox :checked="field.required" @update:checked="updateField(field.id, { required: $event })" />
              Required
            </label>
          </div>
        </div>
      </div>

      <div v-if="schema.fields.length === 0" class="rounded-lg border border-dashed p-8 text-center">
        <Icon name="lucide:table" class="text-muted-foreground mx-auto mb-2 h-8 w-8" />
        <p class="text-muted-foreground text-sm">No fields yet. Add your first field to get started.</p>
      </div>
    </div>
  </div>
</template>
