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
          <span class="glow-text-green">Tu as fini.</span>
          <span class="text-[var(--color-text)]"> Maintenant : ouvre Claude Code et essaie.</span>
        </p>
        <p class="text-[var(--color-text-muted)] mb-6 max-w-2xl">
          La meilleure façon d'apprendre ces 4 concepts, c'est de les utiliser sur un vrai projet.
          Skills d'abord (le plus simple), puis hooks (très puissant), puis MCP, puis subagents.
        </p>

        <div class="flex flex-wrap gap-3 font-mono text-xs">
          <a
            href="https://docs.claude.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener"
            class="px-3 py-2 rounded border border-[var(--color-neon-green)] text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/10 transition-colors"
          >
            → docs officielles
          </a>
          <button
            class="px-3 py-2 rounded border border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
            @click="scrollTop"
          >
            ↑ retour en haut
          </button>
        </div>

        <div v-if="expertMode" class="mt-6 pt-6 border-t border-[var(--color-border)]">
          <p class="font-mono text-xs glow-text-purple uppercase tracking-widest mb-3">
            # expert mode — bonus
          </p>
          <ul class="font-mono text-xs text-[var(--color-text-muted)] space-y-1">
            <li>→ les skills peuvent contenir des sous-skills (composition)</li>
            <li>→ les subagents tournent dans leur propre fenêtre de contexte — c'est leur force</li>
            <li>→ MCP supporte stdio, SSE et HTTP — choisis selon ton runtime</li>
            <li>→ les hooks peuvent bloquer une action (exit code ≠ 0 = stop)</li>
          </ul>
        </div>
      </div>

      <p class="font-mono text-xs text-[var(--color-text-dim)] text-center mt-8">
        // claude-code-for-dummies · made with too much neon
      </p>
    </div>
  </footer>
</template>
