<script setup lang="ts">
// MCP : Claude central, des services qui se "branchent" via des connecteurs animés
const services = [
  { name: 'GitHub', icon: 'lucide:github' },
  { name: 'Slack', icon: 'lucide:message-square' },
  { name: 'Postgres', icon: 'lucide:database' },
  { name: 'Drive', icon: 'lucide:hard-drive' },
]
const state = ref(services.map((s) => ({ ...s, plugged: false })))

function togglePlug(i: number) {
  state.value[i]!.plugged = !state.value[i]!.plugged
}

const pluggedCount = computed(() => state.value.filter((s) => s.plugged).length)

const positions = [
  { x: '12%', y: '18%' },
  { x: '88%', y: '18%' },
  { x: '12%', y: '82%' },
  { x: '88%', y: '82%' },
]
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // clique sur un service pour le brancher à Claude via MCP
    </p>

    <div class="relative h-52 flex items-center justify-center">
      <!-- Hub Claude central -->
      <div class="relative z-10">
        <div
          class="w-32 h-32 rounded-2xl border bg-[var(--color-bg-card)] neon-border-purple flex items-center justify-center flex-col gap-1"
        >
          <Icon
            name="lucide:cpu"
            class="w-8 h-8 text-[var(--color-mcp)]"
            :class="{ 'animate-pulse-glow': pluggedCount > 0 }"
          />
          <span class="font-mono text-xs text-[var(--color-text)]">claude</span>
          <span class="font-mono text-[10px] text-[var(--color-mcp)]">{{ pluggedCount }} ports actifs</span>
        </div>
      </div>

      <!-- Connecteurs SVG -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none">
        <line
          v-for="(s, i) in state"
          :key="s.name"
          :x1="positions[i]!.x"
          :y1="positions[i]!.y"
          x2="50%"
          y2="50%"
          :stroke="s.plugged ? '#b66cff' : '#2d3454'"
          :stroke-width="s.plugged ? 2 : 1"
          :stroke-dasharray="s.plugged ? '0' : '4 4'"
          class="transition-all duration-500"
          :style="{
            filter: s.plugged ? 'drop-shadow(0 0 6px #b66cff)' : 'none',
          }"
        />
      </svg>

      <!-- Services autour -->
      <button
        v-for="(s, i) in state"
        :key="s.name"
        class="absolute transition-all duration-300 group z-10"
        :style="{ left: positions[i]!.x, top: positions[i]!.y, transform: 'translate(-50%, -50%)' }"
        @click="togglePlug(i)"
      >
        <div
          class="px-3 py-2 rounded-lg border bg-[var(--color-bg-card)] flex items-center gap-2 transition-all"
          :class="
            s.plugged
              ? 'neon-border-purple'
              : 'border-[var(--color-border-strong)] group-hover:border-[var(--color-mcp)]/50'
          "
        >
          <Icon
            :name="s.icon"
            class="w-4 h-4"
            :class="s.plugged ? 'text-[var(--color-mcp)]' : 'text-[var(--color-text-muted)]'"
          />
          <span
            class="font-mono text-xs"
            :class="s.plugged ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'"
          >
            {{ s.name }}
          </span>
        </div>
      </button>
    </div>

    <p class="font-mono text-xs text-center text-[var(--color-text-dim)] mt-2">
      <span v-if="pluggedCount === 0">aucun service branché</span>
      <span v-else class="text-[var(--color-mcp)]">
        {{ pluggedCount }} service{{ pluggedCount > 1 ? 's' : '' }} accessible{{ pluggedCount > 1 ? 's' : '' }}
      </span>
    </p>
  </div>
</template>
