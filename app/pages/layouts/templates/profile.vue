<template>
  <Page
    subtitle="Templates"
    subtitle-color="text-purple-300"
    title="Profile"
    description="User profile page with avatar, bio, and activity feed."
    show-back-button
    container-class="space-y-6"
  >
    <div class="border-border bg-card rounded-xl border p-6">
      <div class="flex items-start gap-6">
        <div class="bg-primary/10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full">
          <Icon name="lucide:user" class="text-primary h-12 w-12" />
        </div>
        <div class="flex-1 space-y-4">
          <div>
            <h1 class="text-foreground text-2xl font-bold">John Doe</h1>
            <p class="text-muted-foreground mt-1 text-sm">@johndoe</p>
          </div>
          <p class="text-foreground max-w-2xl text-sm">
            Product designer and developer. Building beautiful interfaces and experiences for the web.
          </p>
          <div class="flex gap-2">
            <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
              Edit profile
            </button>
            <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Icon name="lucide:briefcase" class="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">Projects</p>
            <p class="text-foreground text-xl font-bold">24</p>
          </div>
        </div>
      </div>
      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <Icon name="lucide:users" class="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">Followers</p>
            <p class="text-foreground text-xl font-bold">1.2k</p>
          </div>
        </div>
      </div>
      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
            <Icon name="lucide:star" class="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">Rating</p>
            <p class="text-foreground text-xl font-bold">4.9</p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-border bg-card rounded-xl border">
      <div class="border-border border-b p-6">
        <h3 class="text-foreground text-lg font-semibold">Recent Activity</h3>
      </div>
      <div class="divide-border divide-y">
        <div v-for="i in 5" :key="i" class="flex items-start gap-4 p-6">
          <div class="bg-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <Icon name="lucide:git-commit" class="text-accent-foreground h-4 w-4" />
          </div>
          <div class="flex-1 space-y-1">
            <p class="text-foreground text-sm font-medium">Completed project milestone</p>
            <p class="text-muted-foreground text-xs">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
