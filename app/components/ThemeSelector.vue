<template>
  <div class="space-y-2">
    <UiLabel v-if="label" :for="selectId">{{ label }}</UiLabel>
    <UiSelect :model-value="currentPresetId" @update:model-value="handleSelect">
      <UiSelectTrigger :id="selectId" :placeholder="placeholder">
        <template #value>
          <div v-if="currentPreset" class="flex items-center gap-2">
            <div
              class="size-4 rounded border"
              :style="{
                backgroundColor: currentPreset.styles[colorMode.value as 'light' | 'dark']?.primary || '#3b82f6',
              }"
            />
            <span>{{ currentPreset.label }}</span>
          </div>
          <span v-else class="text-muted-foreground">{{ placeholder }}</span>
        </template>
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectViewport>
          <UiSelectItem v-if="showReset" value="__default__" text="Default Theme">
            <div class="flex items-center gap-2">
              <div class="size-4 rounded border border-border bg-background" />
              <span>Default Theme</span>
            </div>
          </UiSelectItem>
          <UiSelectSeparator v-if="showReset && Object.keys(builtInPresets).length > 0" />
          <UiSelectGroup v-if="Object.keys(builtInPresets).length > 0">
            <UiSelectLabel>Built-in Presets</UiSelectLabel>
            <UiSelectItem
              v-for="[id, preset] in Object.entries(builtInPresets)"
              :key="id"
              :value="id"
              :text="preset.label"
            >
              <div class="flex items-center gap-2">
                <div
                  class="size-4 rounded border"
                  :style="{
                    backgroundColor: preset.styles[colorMode.value as 'light' | 'dark']?.primary || '#3b82f6',
                  }"
                />
                <span>{{ preset.label }}</span>
              </div>
            </UiSelectItem>
          </UiSelectGroup>
          <UiSelectSeparator v-if="Object.keys(customPresets).length > 0" />
          <UiSelectGroup v-if="Object.keys(customPresets).length > 0">
            <UiSelectLabel>Custom Presets</UiSelectLabel>
            <UiSelectItem
              v-for="[id, preset] in Object.entries(customPresets)"
              :key="id"
              :value="id"
              :text="preset.label"
            >
              <div class="flex items-center gap-2">
                <div
                  class="size-4 rounded border"
                  :style="{
                    backgroundColor: preset.styles[colorMode.value as 'light' | 'dark']?.primary || '#3b82f6',
                  }"
                />
                <span>{{ preset.label }}</span>
              </div>
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectViewport>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script setup lang="ts">
  import type { ThemePresetId } from '~/types/theme'

  interface Props {
    label?: string
    placeholder?: string
    showReset?: boolean
    selectId?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    label: 'Theme Preset',
    placeholder: 'Select a theme...',
    showReset: true,
    selectId: 'theme-selector',
  })

  const { currentPreset, currentPresetId, builtInPresets, customPresets, setPreset, resetTheme, colorMode } = useTheme()

  const handleSelect = (value: string | null) => {
    if (!value || value === '' || value === '__default__') {
      resetTheme()
    } else {
      setPreset(value as ThemePresetId)
    }
  }
</script>
