<template>
  <Page
    subtitle="Blog"
    subtitle-color="text-blue-300"
    title="Blog"
    description="Blog listing with cards, filters, and pagination."
    show-back-button
    container-class="space-y-8"
  >
    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">All</button>
      <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
        Design
      </button>
      <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
        Development
      </button>
      <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
        Product
      </button>
    </div>

    <!-- Blog Posts Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="border-border bg-card group cursor-pointer overflow-hidden rounded-xl border transition hover:border-primary/50"
      >
        <div class="bg-muted/50 aspect-video" />
        <div class="space-y-3 p-6">
          <div class="flex items-center gap-2 text-xs">
            <span class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 font-medium">Design</span>
            <span class="text-muted-foreground">Mar 15, 2024</span>
          </div>
          <h3 class="text-foreground text-lg font-semibold group-hover:text-primary transition-colors">
            Getting Started with Design Systems
          </h3>
          <p class="text-muted-foreground line-clamp-2 text-sm">
            Learn how to build and maintain a design system that scales with your team and products.
          </p>
          <div class="flex items-center gap-2">
            <div class="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full">
              <Icon name="lucide:user" class="text-primary h-3 w-3" />
            </div>
            <span class="text-muted-foreground text-xs">Sarah Chen</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-center gap-2">
      <button
        class="border-border bg-background text-foreground flex h-9 w-9 items-center justify-center rounded-lg border"
        disabled
      >
        <Icon name="lucide:chevron-left" class="h-4 w-4" />
      </button>
      <button class="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-lg">1</button>
      <button
        class="border-border bg-background text-foreground flex h-9 w-9 items-center justify-center rounded-lg border"
      >
        2
      </button>
      <button
        class="border-border bg-background text-foreground flex h-9 w-9 items-center justify-center rounded-lg border"
      >
        3
      </button>
      <button
        class="border-border bg-background text-foreground flex h-9 w-9 items-center justify-center rounded-lg border"
      >
        <Icon name="lucide:chevron-right" class="h-4 w-4" />
      </button>
    </div>
  </Page>
</template>
