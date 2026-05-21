<script setup lang="ts">
// Plan mode: Claude drafts steps, you approve, then it runs them in order.
const steps = [
  'Read the existing auth middleware',
  'List the 3 routes that need protection',
  'Wire OAuth callback handler',
  'Add a test for the happy path',
]

type Phase = 'idle' | 'planning' | 'awaiting-approval' | 'executing' | 'done'

const phase = ref<Phase>('idle')
const visibleSteps = ref(0)
const executedSteps = ref(0)

async function draftPlan() {
  if (phase.value === 'planning' || phase.value === 'executing') return
  reset()
  phase.value = 'planning'
  for (let i = 0; i < steps.length; i++) {
    await new Promise((r) => setTimeout(r, 300))
    visibleSteps.value = i + 1
  }
  phase.value = 'awaiting-approval'
}

async function approve() {
  phase.value = 'executing'
  for (let i = 0; i < steps.length; i++) {
    await new Promise((r) => setTimeout(r, 350))
    executedSteps.value = i + 1
  }
  phase.value = 'done'
}

function reset() {
  phase.value = 'idle'
  visibleSteps.value = 0
  executedSteps.value = 0
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // Claude drafts the plan first — you sign off, then it executes
    </p>

    <!-- Phase indicator -->
    <div class="flex items-center gap-2 mb-4 font-mono text-[11px]">
      <span class="text-[var(--color-text-dim)]">phase:</span>
      <span class="text-[var(--color-planmode)]">{{ phase }}</span>
    </div>

    <!-- The plan -->
    <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4 mb-4 min-h-[160px]">
      <div class="flex items-center gap-2 mb-3">
        <Icon name="lucide:list-todo" class="w-4 h-4 text-[var(--color-planmode)]" />
        <span class="font-mono text-xs text-[var(--color-planmode)]">plan.md</span>
      </div>
      <ol class="space-y-2">
        <template v-for="(step, i) in steps" :key="i">
          <Transition
            enter-active-class="transition-all duration-400"
            enter-from-class="opacity-0 -translate-x-2"
            enter-to-class="opacity-100 translate-x-0"
          >
            <li
              v-if="i < visibleSteps"
              class="flex gap-3 items-start font-mono text-xs"
            >
              <span
                class="w-4 h-4 mt-0.5 rounded border shrink-0 flex items-center justify-center transition-all"
                :class="
                  i < executedSteps
                    ? 'border-[var(--color-planmode)] bg-[var(--color-planmode)]/20 text-[var(--color-planmode)]'
                    : 'border-[var(--color-border-strong)] text-transparent'
                "
              >
                ✓
              </span>
              <span
                class="leading-relaxed"
                :class="i < executedSteps ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'"
              >
                {{ step }}
              </span>
            </li>
          </Transition>
        </template>
        <li v-if="phase === 'idle'" class="font-mono text-xs text-[var(--color-text-dim)]">
          // empty — click "draft plan" to start
        </li>
      </ol>
    </div>

    <!-- Controls -->
    <div class="flex flex-wrap gap-2">
      <button
        v-if="phase === 'idle' || phase === 'done'"
        class="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-planmode)] text-[var(--color-planmode)] hover:bg-[var(--color-planmode)]/10 transition-colors"
        @click="draftPlan"
      >
        ✎ draft plan
      </button>
      <button
        v-if="phase === 'awaiting-approval'"
        class="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-planmode)] text-[var(--color-planmode)] hover:bg-[var(--color-planmode)]/10 transition-colors animate-pulse-glow"
        @click="approve"
      >
        ✓ approve & execute
      </button>
      <button
        v-if="phase === 'done'"
        class="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
        @click="reset"
      >
        ↻ reset
      </button>
      <span
        v-if="phase === 'planning'"
        class="font-mono text-xs text-[var(--color-text-muted)] flex items-center gap-2"
      >
        <Icon name="lucide:loader-circle" class="w-3 h-3 animate-spin" />
        drafting…
      </span>
      <span
        v-if="phase === 'executing'"
        class="font-mono text-xs text-[var(--color-text-muted)] flex items-center gap-2"
      >
        <Icon name="lucide:loader-circle" class="w-3 h-3 animate-spin" />
        executing… ({{ executedSteps }}/{{ steps.length }})
      </span>
    </div>
  </div>
</template>
