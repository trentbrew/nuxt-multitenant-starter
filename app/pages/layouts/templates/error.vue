<template>
  <Page
    subtitle="Error Pages"
    subtitle-color="text-red-300"
    title="Error Pages"
    description="404, 500, and maintenance page templates."
    show-back-button
    container-class="space-y-12"
  >
    <!-- 404 Not Found -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:file-question" class="text-primary h-10 w-10" />
        </div>
        <h1 class="text-foreground mt-6 text-4xl font-bold">404</h1>
        <h2 class="text-foreground mt-4 text-2xl font-semibold">Page not found</h2>
        <p class="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          The page you're looking for doesn't exist or has been moved. Check the URL or return to the homepage.
        </p>
        <div class="mt-8 flex gap-3">
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">Go home</button>
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Go back
          </button>
        </div>
      </div>
    </div>

    <!-- 500 Server Error -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-red-500/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:alert-circle" class="text-red-500 h-10 w-10" />
        </div>
        <h1 class="text-foreground mt-6 text-4xl font-bold">500</h1>
        <h2 class="text-foreground mt-4 text-2xl font-semibold">Server error</h2>
        <p class="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          Something went wrong on our end. We're working to fix the issue. Please try again in a few moments.
        </p>
        <div class="mt-8 flex gap-3">
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">Try again</button>
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Contact support
          </button>
        </div>
      </div>
    </div>

    <!-- 403 Forbidden -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-yellow-500/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:lock" class="text-yellow-500 h-10 w-10" />
        </div>
        <h1 class="text-foreground mt-6 text-4xl font-bold">403</h1>
        <h2 class="text-foreground mt-4 text-2xl font-semibold">Access forbidden</h2>
        <p class="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          You don't have permission to access this resource. If you believe this is an error, please contact your
          administrator.
        </p>
        <div class="mt-8 flex gap-3">
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">Go home</button>
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Request access
          </button>
        </div>
      </div>
    </div>

    <!-- Maintenance Mode -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-blue-500/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:wrench" class="text-blue-500 h-10 w-10" />
        </div>
        <h1 class="text-foreground mt-6 text-4xl font-bold">Under maintenance</h1>
        <h2 class="text-foreground mt-4 text-2xl font-semibold">We'll be back soon</h2>
        <p class="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          We're currently performing scheduled maintenance. We'll be back online shortly. Thank you for your patience.
        </p>
        <div class="mt-8 space-y-2">
          <p class="text-muted-foreground text-sm">
            <span class="font-medium">Estimated time:</span>
            30 minutes
          </p>
          <p class="text-muted-foreground text-sm">
            <span class="font-medium">Started:</span>
            2:00 PM EST
          </p>
        </div>
      </div>
    </div>

    <!-- Offline / Network Error -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-orange-500/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:wifi-off" class="text-orange-500 h-10 w-10" />
        </div>
        <h1 class="text-foreground mt-6 text-4xl font-bold">No connection</h1>
        <h2 class="text-foreground mt-4 text-2xl font-semibold">You're offline</h2>
        <p class="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          It looks like you've lost your internet connection. Please check your network settings and try again.
        </p>
        <div class="mt-8 flex gap-3">
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">Retry</button>
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Check connection
          </button>
        </div>
      </div>
    </div>
  </Page>
</template>
