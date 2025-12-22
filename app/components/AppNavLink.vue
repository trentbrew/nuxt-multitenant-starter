<template>
  <NuxtLink :to="to" custom v-slot="{ href }">
    <a :href="href" v-bind="$attrs" @click="onClick">
      <slot />
    </a>
  </NuxtLink>
</template>

<script lang="ts" setup>
  import { useAppNavigate } from '~/composables/useAppNavigate'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    to: string
  }>()

  const appNavigate = useAppNavigate()

  const onClick = async (e: MouseEvent) => {
    // Allow new-tab/middle-click behavior to work normally.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    e.preventDefault()
    await appNavigate.navigate(props.to, e)
  }
</script>
