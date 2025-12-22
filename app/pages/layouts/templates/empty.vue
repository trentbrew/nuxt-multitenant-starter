<template>
  <Page
    subtitle="Empty State"
    subtitle-color="text-yellow-300"
    title="Empty State"
    description="Placeholder for empty data views with action prompts."
    show-back-button
    container-class="space-y-8"
  >
    <!-- Default Empty State -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-muted/50 flex h-16 w-16 items-center justify-center rounded-full">
          <Icon name="lucide:inbox" class="text-muted-foreground h-8 w-8" />
        </div>
        <h3 class="text-foreground mt-6 text-xl font-semibold">No items yet</h3>
        <p class="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          Get started by creating your first item. It only takes a few seconds.
        </p>
        <button class="bg-primary text-primary-foreground mt-6 rounded-lg px-4 py-2 text-sm font-medium">
          Create item
        </button>
      </div>
    </div>

    <!-- Empty State with Illustration -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="lucide:file-x" class="text-primary h-10 w-10" />
        </div>
        <h3 class="text-foreground mt-6 text-xl font-semibold">No documents found</h3>
        <p class="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          You haven't created any documents yet. Start by uploading or creating a new document.
        </p>
        <div class="mt-6 flex gap-3">
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
            Upload document
          </button>
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Create new
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State with Search -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-muted/50 flex h-16 w-16 items-center justify-center rounded-full">
          <Icon name="lucide:search" class="text-muted-foreground h-8 w-8" />
        </div>
        <h3 class="text-foreground mt-6 text-xl font-semibold">No results found</h3>
        <p class="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          We couldn't find any items matching your search. Try adjusting your filters or search terms.
        </p>
        <div class="mt-6 flex gap-3">
          <button class="border-border bg-background text-foreground rounded-lg border px-4 py-2 text-sm font-medium">
            Clear filters
          </button>
          <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
            New search
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State with Action List -->
    <div class="border-border bg-card rounded-xl border p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
          <Icon name="lucide:folder-plus" class="text-primary h-8 w-8" />
        </div>
        <h3 class="text-foreground mt-6 text-xl font-semibold">No projects yet</h3>
        <p class="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          Create your first project to get started. Here are some things you can do:
        </p>
        <div class="mt-6 w-full max-w-md space-y-2">
          <div
            v-for="action in ['Create a new project', 'Import from template', 'Browse examples']"
            :key="action"
            class="border-border bg-background flex items-center justify-between rounded-lg border p-3"
          >
            <span class="text-foreground text-sm">{{ action }}</span>
            <Icon name="lucide:arrow-right" class="text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
