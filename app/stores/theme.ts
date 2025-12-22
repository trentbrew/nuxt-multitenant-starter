import { defineStore } from 'pinia'
import type { ThemePreset, ThemePresetId, ThemePresets } from '~/types/theme'
import { defaultPresets } from '~/config/presets'
import { applyThemePreset } from '~/utils/theme'

interface ThemeStoreState {
  presets: ThemePresets
  currentPresetId: ThemePresetId | null
  customPresets: ThemePresets
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeStoreState => ({
    presets: { ...defaultPresets },
    currentPresetId: null,
    customPresets: {},
  }),

  getters: {
    /**
     * Get all available presets (built-in + custom)
     */
    allPresets: (state): ThemePresets => {
      return {
        ...state.presets,
        ...state.customPresets,
      }
    },

    /**
     * Get the current active preset
     */
    currentPreset: (state): ThemePreset | null => {
      if (!state.currentPresetId) return null
      return state.allPresets[state.currentPresetId] || null
    },

    /**
     * Get built-in presets only
     */
    builtInPresets: (state): ThemePresets => {
      return Object.fromEntries(Object.entries(state.presets).filter(([, preset]) => preset.source !== 'CUSTOM'))
    },

    /**
     * Get custom presets only
     */
    customPresetsOnly: (state): ThemePresets => {
      return state.customPresets
    },
  },

  actions: {
    /**
     * Set the current theme preset
     */
    setPreset(presetId: ThemePresetId, mode: 'light' | 'dark' = 'light') {
      const preset = this.allPresets[presetId]
      if (!preset) {
        console.warn(`Theme preset "${presetId}" not found`)
        return
      }

      this.currentPresetId = presetId
      applyThemePreset(preset, mode)

      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('theme-preset-id', presetId)
        localStorage.setItem('theme-mode', mode)
      }
    },

    /**
     * Register a new custom preset
     */
    registerPreset(presetId: ThemePresetId, preset: ThemePreset) {
      this.customPresets[presetId] = {
        ...preset,
        source: 'CUSTOM',
      }

      // Persist custom presets to localStorage
      if (process.client) {
        this.saveCustomPresets()
      }
    },

    /**
     * Update an existing preset
     */
    updatePreset(presetId: ThemePresetId, preset: Partial<ThemePreset>) {
      if (this.presets[presetId]) {
        this.presets[presetId] = { ...this.presets[presetId], ...preset }
      } else if (this.customPresets[presetId]) {
        this.customPresets[presetId] = { ...this.customPresets[presetId], ...preset }
      }

      // If this is the current preset, reapply it
      if (this.currentPresetId === presetId) {
        const mode = (process.client && localStorage.getItem('theme-mode')) || 'light'
        this.setPreset(presetId, mode as 'light' | 'dark')
      }

      if (process.client) {
        this.saveCustomPresets()
      }
    },

    /**
     * Delete a custom preset
     */
    deletePreset(presetId: ThemePresetId) {
      if (this.customPresets[presetId]) {
        delete this.customPresets[presetId]

        // If this was the current preset, reset to default
        if (this.currentPresetId === presetId) {
          this.currentPresetId = null
          if (process.client) {
            localStorage.removeItem('theme-preset-id')
          }
        }

        if (process.client) {
          this.saveCustomPresets()
        }
      }
    },

    /**
     * Load custom presets from localStorage
     */
    loadCustomPresets() {
      if (!process.client) return

      try {
        const stored = localStorage.getItem('theme-custom-presets')
        if (stored) {
          this.customPresets = JSON.parse(stored)
        }
      } catch (error) {
        console.error('Failed to load custom presets:', error)
      }
    },

    /**
     * Save custom presets to localStorage
     */
    saveCustomPresets() {
      if (!process.client) return

      try {
        localStorage.setItem('theme-custom-presets', JSON.stringify(this.customPresets))
      } catch (error) {
        console.error('Failed to save custom presets:', error)
      }
    },

    /**
     * Initialize theme from localStorage
     */
    initTheme() {
      if (!process.client) return

      this.loadCustomPresets()

      const savedPresetId = localStorage.getItem('theme-preset-id')
      const savedMode = (localStorage.getItem('theme-mode') || 'light') as 'light' | 'dark'

      if (savedPresetId && this.allPresets[savedPresetId]) {
        this.setPreset(savedPresetId, savedMode)
      }
    },
  },
})
