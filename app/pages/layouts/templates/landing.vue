<template>
  <Page
    subtitle="Landing"
    subtitle-color="text-orange-300"
    title="Landing Page"
    description="Hero section with features, testimonials, and footer."
    show-back-button
    container-class="space-y-12"
  >
    <!-- Hero Section -->
    <div class="space-y-8 text-center">
      <div class="space-y-4">
        <h1 class="text-foreground text-5xl font-bold tracking-tight sm:text-6xl">Build amazing products faster</h1>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Everything you need to create beautiful, responsive interfaces. Start building today with our comprehensive
          design system.
        </p>
      </div>
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button class="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-base font-medium">
          Get started
        </button>
        <button class="border-border bg-background text-foreground rounded-lg border px-6 py-3 text-base font-medium">
          Learn more
        </button>
      </div>
    </div>

    <!-- Features Section -->
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-foreground text-3xl font-bold">Everything you need</h2>
        <p class="text-muted-foreground mt-2 text-sm">Powerful features to help you build faster</p>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="border-border bg-card rounded-xl border p-6">
          <div class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <Icon name="lucide:zap" class="text-primary h-6 w-6" />
          </div>
          <h3 class="text-foreground text-lg font-semibold">Lightning fast</h3>
          <p class="text-muted-foreground mt-2 text-sm">
            Built with performance in mind. Optimized for speed and efficiency.
          </p>
        </div>
        <div class="border-border bg-card rounded-xl border p-6">
          <div class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <Icon name="lucide:palette" class="text-primary h-6 w-6" />
          </div>
          <h3 class="text-foreground text-lg font-semibold">Beautiful design</h3>
          <p class="text-muted-foreground mt-2 text-sm">Carefully crafted components that look great out of the box.</p>
        </div>
        <div class="border-border bg-card rounded-xl border p-6">
          <div class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <Icon name="lucide:code" class="text-primary h-6 w-6" />
          </div>
          <h3 class="text-foreground text-lg font-semibold">Developer friendly</h3>
          <p class="text-muted-foreground mt-2 text-sm">
            Clean, well-documented code that's easy to customize and extend.
          </p>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-foreground text-3xl font-bold">Loved by developers</h2>
        <p class="text-muted-foreground mt-2 text-sm">See what others are saying</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <div class="border-border bg-card rounded-xl border p-6">
          <div class="mb-4 flex items-center gap-4">
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Icon name="lucide:user" class="text-primary h-5 w-5" />
            </div>
            <div>
              <p class="text-foreground text-sm font-semibold">Sarah Chen</p>
              <p class="text-muted-foreground text-xs">Product Designer</p>
            </div>
          </div>
          <p class="text-foreground text-sm">
            "This has completely transformed how we build interfaces. The components are beautiful and the documentation
            is excellent."
          </p>
        </div>
        <div class="border-border bg-card rounded-xl border p-6">
          <div class="mb-4 flex items-center gap-4">
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Icon name="lucide:user" class="text-primary h-5 w-5" />
            </div>
            <div>
              <p class="text-foreground text-sm font-semibold">Michael Rodriguez</p>
              <p class="text-muted-foreground text-xs">Frontend Developer</p>
            </div>
          </div>
          <p class="text-foreground text-sm">
            "The best design system I've used. It's saved us countless hours and our users love the polished
            experience."
          </p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="border-border bg-card rounded-xl border p-12 text-center">
      <h2 class="text-foreground text-3xl font-bold">Ready to get started?</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-xl text-sm">
        Join thousands of developers building amazing products with our design system.
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button class="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-base font-medium">
          Start building
        </button>
        <button class="border-border bg-background text-foreground rounded-lg border px-6 py-3 text-base font-medium">
          View documentation
        </button>
      </div>
    </div>
  </Page>
</template>
