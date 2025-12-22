<template>
  <Page
    subtitle="Activity"
    title="Activity feed"
    description="Real-time stream of form submissions, responses, and system events."
  >
    <div class="space-y-3">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>No activity yet</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground text-sm">Hook this up to your data source to populate recent changes.</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Deploy notifications</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground text-sm">Show build times, rollbacks, and environment health.</p>
        </UiCardContent>
      </UiCard>
    </div>
  </Page>
</template>
