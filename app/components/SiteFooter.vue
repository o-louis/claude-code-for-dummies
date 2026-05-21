<script setup lang="ts">
defineProps<{ expertMode: boolean }>()

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative px-6 py-16 border-t border-[var(--color-border)] z-10">
    <div class="max-w-6xl mx-auto">
      <div class="terminal-frame p-6 md:p-8">
        <p class="font-mono text-xs text-[var(--color-text-dim)] mb-2">// EOF</p>
        <p class="font-display text-2xl md:text-3xl font-bold mb-3">
          <span class="glow-text-green">You made it.</span>
          <span class="text-[var(--color-text)]"> Now: open Claude Code and try one.</span>
        </p>
        <p class="text-[var(--color-text-muted)] mb-6 max-w-2xl">
          The best way to learn these four concepts is to use them on a real project.
          Start with Skills (easiest), then Hooks (very powerful), then MCP, then Subagents.
        </p>

        <div class="flex flex-wrap gap-3 font-mono text-xs">
          <a
            href="https://docs.claude.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener"
            class="px-3 py-2 rounded border border-[var(--color-neon-green)] text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/10 transition-colors"
          >
            → official docs
          </a>
          <button
            class="px-3 py-2 rounded border border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
            @click="scrollTop"
          >
            ↑ back to top
          </button>
        </div>

        <div v-if="expertMode" class="mt-6 pt-6 border-t border-[var(--color-border)]">
          <p class="font-mono text-xs glow-text-purple uppercase tracking-widest mb-3">
            # expert mode — bonus
          </p>
          <ul class="font-mono text-xs text-[var(--color-text-muted)] space-y-1">
            <li>→ skills can include sub-skills (composition)</li>
            <li>→ subagents run in their own context window — that's their superpower</li>
            <li>→ MCP supports stdio, SSE and HTTP — pick by runtime</li>
            <li>→ hooks can block an action (exit code ≠ 0 = stop)</li>
          </ul>
        </div>
      </div>

      <p class="font-mono text-xs text-[var(--color-text-dim)] text-center mt-8">
        // claude-code-for-dummies · made with too much neon
      </p>
    </div>
  </footer>
</template>
