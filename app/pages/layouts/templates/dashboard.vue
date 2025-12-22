<template>
  <Page
    subtitle="Dashboard"
    subtitle-color="text-blue-300"
    title="Analytics Overview"
    description="Track your key metrics and performance indicators at a glance."
    show-back-button
    container-class="space-y-6"
  >
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center justify-between">
          <p class="text-muted-foreground text-sm font-medium">Total Revenue</p>
          <Icon name="lucide:dollar-sign" class="text-muted-foreground h-4 w-4" />
        </div>
        <div class="mt-3">
          <p class="text-foreground text-2xl font-bold">$45,231.89</p>
          <p class="text-muted-foreground mt-1 text-xs">+20.1% from last month</p>
        </div>
      </div>

      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center justify-between">
          <p class="text-muted-foreground text-sm font-medium">Subscriptions</p>
          <Icon name="lucide:users" class="text-muted-foreground h-4 w-4" />
        </div>
        <div class="mt-3">
          <p class="text-foreground text-2xl font-bold">+2,350</p>
          <p class="text-muted-foreground mt-1 text-xs">+180.1% from last month</p>
        </div>
      </div>

      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center justify-between">
          <p class="text-muted-foreground text-sm font-medium">Sales</p>
          <Icon name="lucide:credit-card" class="text-muted-foreground h-4 w-4" />
        </div>
        <div class="mt-3">
          <p class="text-foreground text-2xl font-bold">+12,234</p>
          <p class="text-muted-foreground mt-1 text-xs">+19% from last month</p>
        </div>
      </div>

      <div class="border-border bg-card rounded-xl border p-6">
        <div class="flex items-center justify-between">
          <p class="text-muted-foreground text-sm font-medium">Active Now</p>
          <Icon name="lucide:activity" class="text-muted-foreground h-4 w-4" />
        </div>
        <div class="mt-3">
          <p class="text-foreground text-2xl font-bold">+573</p>
          <p class="text-muted-foreground mt-1 text-xs">+201 since last hour</p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div class="border-border bg-card col-span-4 rounded-xl border p-6">
        <div class="space-y-2">
          <h3 class="text-foreground text-lg font-semibold">Overview</h3>
          <p class="text-muted-foreground text-sm">Monthly revenue trends</p>
        </div>
        <div class="bg-muted/50 mt-6 flex h-[200px] items-center justify-center rounded-lg">
          <p class="text-muted-foreground text-sm">Chart placeholder</p>
        </div>
      </div>

      <div class="border-border bg-card col-span-3 rounded-xl border p-6">
        <div class="space-y-2">
          <h3 class="text-foreground text-lg font-semibold">Recent Sales</h3>
          <p class="text-muted-foreground text-sm">You made 265 sales this month</p>
        </div>
        <div class="mt-6 space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4">
            <div class="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
              <Icon name="lucide:user" class="text-primary h-4 w-4" />
            </div>
            <div class="flex-1 space-y-1">
              <p class="text-foreground text-sm font-medium">Customer {{ i }}</p>
              <p class="text-muted-foreground text-xs">customer{{ i }}@email.com</p>
            </div>
            <p class="text-foreground text-sm font-medium">+$1,999.00</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
