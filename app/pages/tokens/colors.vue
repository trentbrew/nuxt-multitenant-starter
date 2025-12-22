<template>
  <Page
    subtitle="Design tokens"
    subtitle-color="text-pink-300"
    title="Color palette"
    description="Design system color tokens including primary, semantic, and neutral scales."
  >
    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="swatch in 4" :key="swatch" class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-linear-to-br from-slate-800 via-slate-700 to-slate-600" />
        <p class="mt-2 text-xs uppercase tracking-wide text-slate-300">Token {{ swatch }}</p>
      </div>
    </div>
  </Page>
</template>
