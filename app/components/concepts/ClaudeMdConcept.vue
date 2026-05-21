<script setup lang="ts">
// CLAUDE.md: rules sit on a notepad; click one and Claude "applies" it.
interface Rule {
  text: string
  applied: string
}

const rules: Rule[] = [
  {
    text: 'Always use TypeScript — no `any` unless justified.',
    applied: 'types every new variable and function explicitly',
  },
  {
    text: 'Commit messages follow Conventional Commits.',
    applied: 'wrote: `fix(auth): handle expired tokens`',
  },
  {
    text: 'Run `npm test` before pushing.',
    applied: 'ran tests — 142 passed, ready to push',
  },
  {
    text: 'Never edit files under /generated.',
    applied: 'skipped /generated/schema.ts, edited the source instead',
  },
]

const activeIdx = ref<number | null>(null)

function pick(i: number) {
  activeIdx.value = activeIdx.value === i ? null : i
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // pick a rule from CLAUDE.md, watch Claude apply it
    </p>

    <div class="grid md:grid-cols-2 gap-4 items-start">
      <!-- The CLAUDE.md file -->
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <Icon name="lucide:file-text" class="w-4 h-4 text-[var(--color-claudemd)]" />
          <span class="font-mono text-xs text-[var(--color-claudemd)]">CLAUDE.md</span>
        </div>
        <ul class="space-y-2">
          <li
            v-for="(rule, i) in rules"
            :key="i"
            class="font-mono text-xs leading-relaxed cursor-pointer transition-all px-2 py-1.5 rounded border"
            :class="
              activeIdx === i
                ? 'border-[var(--color-claudemd)]/60 bg-[var(--color-claudemd)]/10 text-[var(--color-text)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-claudemd)]/30'
            "
            @click="pick(i)"
          >
            <span class="text-[var(--color-claudemd)] mr-1">-</span>{{ rule.text }}
          </li>
        </ul>
      </div>

      <!-- Claude applying the rule -->
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4 min-h-[140px]">
        <div class="flex items-center gap-2 mb-3">
          <Icon name="lucide:brain" class="w-4 h-4 text-[var(--color-claudemd)]" />
          <span class="font-mono text-xs text-[var(--color-text-muted)]">claude ▸ next task</span>
        </div>
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 translate-y-1"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <p
            v-if="activeIdx !== null"
            :key="activeIdx"
            class="font-mono text-xs leading-relaxed text-[var(--color-text)]"
          >
            <span class="text-[var(--color-claudemd)]">[rule loaded]</span>
            <span class="block mt-2">→ {{ rules[activeIdx]!.applied }}</span>
          </p>
          <p v-else key="idle" class="font-mono text-xs text-[var(--color-text-dim)]">
            // no rule picked yet — Claude waits with the handbook open
          </p>
        </Transition>
      </div>
    </div>
  </div>
</template>
