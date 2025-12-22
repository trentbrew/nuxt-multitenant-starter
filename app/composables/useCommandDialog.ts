export const useCommandDialog = () => {
  const isOpen = ref(false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  // Handle cmd+k keyboard shortcut
  if (import.meta.client) {
    let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;

    onMounted(() => {
      handleKeyDown = (e: KeyboardEvent) => {
        // Check for cmd+k (Mac) or ctrl+k (Windows/Linux)
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          toggle();
        }
        // Close on Escape
        if (e.key === "Escape" && isOpen.value) {
          close();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
    });

    onUnmounted(() => {
      if (handleKeyDown) {
        window.removeEventListener("keydown", handleKeyDown);
      }
    });
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
