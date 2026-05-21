<script setup lang="ts">
// Subagents: dispatch 3 interns on a mission, they come back with a report
type Phase = 'idle' | 'dispatching' | 'working' | 'returning' | 'done'

const phase = ref<Phase>('idle')
const agents = [
  { name: 'Explore', task: 'scan the repo', icon: 'lucide:search', result: '12 matches' },
  { name: 'Plan', task: 'draft a plan', icon: 'lucide:file-text', result: '6-step plan' },
  { name: 'Review', task: 'review the diff', icon: 'lucide:check-check', result: '2 nits, 1 bug' },
]

async function runMission() {
  if (phase.value !== 'idle' && phase.value !== 'done') return
  phase.value = 'dispatching'
  await new Promise((r) => setTimeout(r, 600))
  phase.value = 'working'
  await new Promise((r) => setTimeout(r, 1800))
  phase.value = 'returning'
  await new Promise((r) => setTimeout(r, 800))
  phase.value = 'done'
}

const positions = [
  { x: -130, y: -55 },
  { x: 130, y: -55 },
  { x: 0, y: 70 },
]

function agentTransform(i: number): string {
  const pos = positions[i]!
  if (phase.value === 'idle') {
    return `translate(-50%, -50%) scale(0.5)`
  }
  if (phase.value === 'dispatching' || phase.value === 'returning') {
    return `translate(calc(-50% + ${pos.x * 0.5}px), calc(-50% + ${pos.y * 0.5}px)) scale(0.85)`
  }
  return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1)`
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // start the mission — 3 agents head out and work in parallel
    </p>

    <div class="relative h-56">
      <!-- Main Claude (you, the project lead) -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          class="px-4 py-3 rounded-lg border bg-[var(--color-bg-card)] flex flex-col items-center gap-1 transition-shadow duration-500"
          :class="phase === 'idle' || phase === 'done' ? 'neon-border-cyan' : 'border-[var(--color-border)]'"
        >
          <Icon name="lucide:brain-circuit" class="w-6 h-6 text-[var(--color-subagents)]" />
          <span class="font-mono text-xs text-[var(--color-text)]">claude</span>
        </div>
      </div>

      <!-- Agents -->
      <div
        v-for="(agent, i) in agents"
        :key="agent.name"
        class="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
        :style="{
          transform: agentTransform(i),
          opacity: phase === 'idle' ? 0 : 1,
        }"
      >
        <div
          class="px-3 py-2 rounded-lg border bg-[var(--color-bg-card)] flex items-center gap-2 transition-shadow duration-500"
          :class="phase === 'working' || phase === 'returning' ? 'neon-border-cyan' : 'border-[var(--color-border)]'"
        >
          <Icon
            :name="agent.icon"
            class="w-4 h-4 text-[var(--color-subagents)]"
            :class="{ 'animate-pulse-glow': phase === 'working' }"
          />
          <div class="flex flex-col">
            <span class="font-mono text-xs text-[var(--color-text)]">{{ agent.name }}</span>
            <span
              class="font-mono text-[10px] transition-opacity"
              :class="
                phase === 'done'
                  ? 'text-[var(--color-subagents)] opacity-100'
                  : 'text-[var(--color-text-dim)] opacity-70'
              "
            >
              {{ phase === 'done' ? agent.result : agent.task }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2 justify-center mt-2">
      <button
        v-if="phase === 'idle' || phase === 'done'"
        class="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-subagents)] text-[var(--color-subagents)] hover:bg-[var(--color-subagents)]/10 transition-colors"
        @click="runMission"
      >
        {{ phase === 'done' ? '↻ run again' : '▶ dispatch 3 agents' }}
      </button>
      <span v-else class="font-mono text-xs text-[var(--color-text-muted)] py-1.5">
        <span v-if="phase === 'dispatching'">→ sending agents...</span>
        <span v-else-if="phase === 'working'">⚙ working in parallel...</span>
        <span v-else>← reports incoming</span>
      </span>
    </div>
  </div>
</template>
