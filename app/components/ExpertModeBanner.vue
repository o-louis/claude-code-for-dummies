<script setup lang="ts">
defineProps<{ active: boolean }>()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500"
    leave-active-class="transition-all duration-300"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="active"
      class="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[var(--color-bg-elevated)] border-b border-[var(--color-neon-purple)]"
      style="box-shadow: 0 4px 24px rgb(182 108 255 / 0.3)"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-center gap-3 font-mono text-xs">
        <Icon name="lucide:sparkles" class="w-4 h-4 text-[var(--color-neon-purple)] animate-pulse-glow" />
        <span class="glow-text-purple uppercase tracking-widest">expert mode unlocked</span>
        <span class="text-[var(--color-text-muted)] hidden sm:inline">
          — you found the easter egg. Konami code detected.
        </span>
      </div>
    </div>
  </Transition>
</template>
