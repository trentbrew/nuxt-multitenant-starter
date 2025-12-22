<template>
  <Page
    subtitle="Layouts"
    title="Layout playground"
    description="Placeholder route for layout experiments. Swap in your own sections, grids, and responsive shells here."
  >
    <div class="grid gap-4 md:grid-cols-2">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Stacked cards</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground text-sm">Use this zone to demo cards, split panes, or feature rows.</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Sidebar shells</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground text-sm">Try alternate sidebar widths, sticky headers, or drawers.</p>
        </UiCardContent>
      </UiCard>
    </div>
  </Page>
</template>
