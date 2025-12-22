<template>
  <Page
    subtitle="Templates"
    subtitle-color="text-gray-300"
    title="Account Settings"
    description="Manage your account settings and preferences."
    show-back-button
    container-class="space-y-6"
  >
    <div class="space-y-6">
      <div class="border-border bg-card rounded-xl border">
        <div class="border-border border-b p-6">
          <h3 class="text-foreground text-lg font-semibold">Profile</h3>
          <p class="text-muted-foreground mt-1 text-sm">Update your personal information</p>
        </div>
        <div class="space-y-4 p-6">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <label class="text-foreground text-sm font-medium">First name</label>
              <input
                type="text"
                placeholder="John"
                class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label class="text-foreground text-sm font-medium">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-foreground text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div class="border-border bg-card rounded-xl border">
        <div class="border-border border-b p-6">
          <h3 class="text-foreground text-lg font-semibold">Preferences</h3>
          <p class="text-muted-foreground mt-1 text-sm">Customize your experience</p>
        </div>
        <div class="space-y-3 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-foreground text-sm font-medium">Email notifications</p>
              <p class="text-muted-foreground text-xs">Receive email about your account activity</p>
            </div>
            <UiSwitch :model-value="true" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-foreground text-sm font-medium">Marketing emails</p>
              <p class="text-muted-foreground text-xs">Receive emails about new features</p>
            </div>
            <UiSwitch :model-value="false" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-foreground text-sm font-medium">Security alerts</p>
              <p class="text-muted-foreground text-xs">Get notified about security updates</p>
            </div>
            <UiSwitch :model-value="true" />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
          Cancel
        </button>
        <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
          Save changes
        </button>
      </div>
    </div>
  </Page>
</template>
