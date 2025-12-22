<template>
  <Page
    subtitle="Templates"
    subtitle-color="text-green-300"
    title="Choose your plan"
    description="Simple, transparent pricing that grows with you. Try any plan free for 30 days."
    show-back-button
    container-class="space-y-12"
  >
    <div class="grid gap-8 lg:grid-cols-3">
      <div class="border-border bg-card rounded-xl border p-8">
        <div class="space-y-4">
          <div>
            <h3 class="text-foreground text-xl font-semibold">Starter</h3>
            <p class="text-muted-foreground mt-2 text-sm">Perfect for trying out our service</p>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-foreground text-4xl font-bold">$0</span>
            <span class="text-muted-foreground text-sm">/month</span>
          </div>
          <button
            class="border-border bg-background text-foreground w-full rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Get started
          </button>
        </div>
        <div class="mt-8 space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-center gap-3">
            <Icon name="lucide:check" class="text-primary h-5 w-5" />
            <span class="text-foreground text-sm">Feature {{ i }}</span>
          </div>
        </div>
      </div>

      <div class="border-primary bg-card relative rounded-xl border-2 p-8 shadow-lg">
        <div
          class="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold"
        >
          Popular
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="text-foreground text-xl font-semibold">Pro</h3>
            <p class="text-muted-foreground mt-2 text-sm">For professionals and small teams</p>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-foreground text-4xl font-bold">$29</span>
            <span class="text-muted-foreground text-sm">/month</span>
          </div>
          <button class="bg-primary text-primary-foreground w-full rounded-lg px-4 py-2 text-sm font-medium">
            Get started
          </button>
        </div>
        <div class="mt-8 space-y-3">
          <div v-for="i in 5" :key="i" class="flex items-center gap-3">
            <Icon name="lucide:check" class="text-primary h-5 w-5" />
            <span class="text-foreground text-sm">Feature {{ i }}</span>
          </div>
        </div>
      </div>

      <div class="border-border bg-card rounded-xl border p-8">
        <div class="space-y-4">
          <div>
            <h3 class="text-foreground text-xl font-semibold">Enterprise</h3>
            <p class="text-muted-foreground mt-2 text-sm">For large organizations</p>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-foreground text-4xl font-bold">$99</span>
            <span class="text-muted-foreground text-sm">/month</span>
          </div>
          <button
            class="border-border bg-background text-foreground w-full rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Contact sales
          </button>
        </div>
        <div class="mt-8 space-y-3">
          <div v-for="i in 7" :key="i" class="flex items-center gap-3">
            <Icon name="lucide:check" class="text-primary h-5 w-5" />
            <span class="text-foreground text-sm">Feature {{ i }}</span>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
