<template>
  <Page
    subtitle="Auth"
    subtitle-color="text-purple-300"
    title="Authentication"
    description="Login, signup, and password reset forms."
    show-back-button
    container-class="space-y-8"
  >
    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Login Form -->
      <div class="border-border bg-card rounded-xl border p-8">
        <div class="space-y-2 mb-6">
          <h3 class="text-foreground text-2xl font-semibold">Sign in</h3>
          <p class="text-muted-foreground text-sm">Enter your credentials to access your account</p>
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-foreground text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-foreground text-sm font-medium">Password</label>
              <button class="text-primary text-xs hover:underline">Forgot password?</button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="remember" class="h-4 w-4 rounded border-input" />
            <label for="remember" class="text-foreground text-sm">Remember me</label>
          </div>
          <button class="bg-primary text-primary-foreground w-full rounded-lg px-4 py-2 text-sm font-medium">
            Sign in
          </button>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="border-border w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="bg-card text-muted-foreground px-2">Or continue with</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button
              class="border-border bg-background text-foreground flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm"
            >
              <Icon name="lucide:github" class="h-4 w-4" />
              GitHub
            </button>
            <button
              class="border-border bg-background text-foreground flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm"
            >
              <Icon name="lucide:chrome" class="h-4 w-4" />
              Google
            </button>
          </div>
        </div>
      </div>

      <!-- Sign Up Form -->
      <div class="border-border bg-card rounded-xl border p-8">
        <div class="space-y-2 mb-6">
          <h3 class="text-foreground text-2xl font-semibold">Create account</h3>
          <p class="text-muted-foreground text-sm">Get started with a free account today</p>
        </div>
        <div class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
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
              placeholder="you@example.com"
              class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div class="space-y-2">
            <label class="text-foreground text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
            />
            <p class="text-muted-foreground text-xs">Must be at least 8 characters</p>
          </div>
          <div class="flex items-start gap-2">
            <input type="checkbox" id="terms" class="mt-1 h-4 w-4 rounded border-input" />
            <label for="terms" class="text-foreground text-sm">
              I agree to the
              <button class="text-primary hover:underline">Terms of Service</button>
              and
              <button class="text-primary hover:underline">Privacy Policy</button>
            </label>
          </div>
          <button class="bg-primary text-primary-foreground w-full rounded-lg px-4 py-2 text-sm font-medium">
            Create account
          </button>
        </div>
      </div>
    </div>

    <!-- Password Reset -->
    <div class="border-border bg-card mx-auto max-w-md rounded-xl border p-8">
      <div class="space-y-2 mb-6 text-center">
        <h3 class="text-foreground text-2xl font-semibold">Reset password</h3>
        <p class="text-muted-foreground text-sm">Enter your email to receive a reset link</p>
      </div>
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-foreground text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            class="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
        <button class="bg-primary text-primary-foreground w-full rounded-lg px-4 py-2 text-sm font-medium">
          Send reset link
        </button>
        <button
          class="border-border bg-background text-foreground w-full rounded-lg border px-4 py-2 text-sm font-medium"
        >
          Back to sign in
        </button>
      </div>
    </div>
  </Page>
</template>
