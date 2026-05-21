<script setup lang="ts">
// Skills: 4 tools laid out around the claude "handle". Click = that one lights up.
interface Tool {
  name: string
  icon: string
  description: string
  pos: 'top' | 'right' | 'bottom' | 'left'
}

const tools: Tool[] = [
  { name: 'changelog', icon: 'lucide:scroll-text', description: 'builds a CHANGELOG from your commits', pos: 'top' },
  { name: 'docs-gen', icon: 'lucide:book-open', description: 'writes docs for a module', pos: 'right' },
  { name: 'commit-msg', icon: 'lucide:git-commit', description: 'writes a clean commit message', pos: 'bottom' },
  { name: 'pr-writer', icon: 'lucide:git-pull-request', description: 'drafts a PR title and description', pos: 'left' },
]

const activeIdx = ref<number | null>(null)

function select(i: number) {
  activeIdx.value = activeIdx.value === i ? null : i
}

const positionClass: Record<Tool['pos'], string> = {
  top: 'top-0 left-1/2 -translate-x-1/2',
  right: 'right-0 top-1/2 -translate-y-1/2',
  bottom: 'bottom-0 left-1/2 -translate-x-1/2',
  left: 'left-0 top-1/2 -translate-y-1/2',
}

// SVG coordinates (in %) for the claude ↔ tool connector lines
const linePos: Record<Tool['pos'], { x: string; y: string }> = {
  top: { x: '50%', y: '15%' },
  right: { x: '85%', y: '50%' },
  bottom: { x: '50%', y: '85%' },
  left: { x: '15%', y: '50%' },
}

const activeTool = computed(() => (activeIdx.value !== null ? tools[activeIdx.value] : null))

function getTransformBase(pos: Tool['pos']): string {
  switch (pos) {
    case 'top':
    case 'bottom':
      return 'translateX(-50%)'
    case 'left':
    case 'right':
      return 'translateY(-50%)'
  }
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // Claude has several skills on standby. Click one to activate the one that fits the job.
    </p>

    <div class="relative h-56 mx-auto max-w-md">
      <!-- Liaisons SVG -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none">
        <line
          v-for="(tool, i) in tools"
          :key="tool.name"
          :x1="linePos[tool.pos].x"
          :y1="linePos[tool.pos].y"
          x2="50%"
          y2="50%"
          :stroke="activeIdx === i ? '#00ffa3' : '#1f2438'"
          :stroke-width="activeIdx === i ? 2 : 1"
          :stroke-dasharray="activeIdx === i ? '0' : '3 4'"
          class="transition-all duration-500"
          :style="{ filter: activeIdx === i ? 'drop-shadow(0 0 6px #00ffa3)' : 'none' }"
        />
      </svg>

      <!-- Badge claude au centre -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-14 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-skills)]/50 flex items-center justify-center gap-2"
        :class="{ 'neon-border-green animate-pulse-glow': activeIdx !== null }"
      >
        <Icon name="lucide:brain" class="w-4 h-4 text-[var(--color-skills)]" />
        <span class="font-mono text-sm text-[var(--color-skills)]">claude</span>
      </div>

      <!-- Outils autour -->
      <button
        v-for="(tool, i) in tools"
        :key="tool.name"
        class="absolute transition-all duration-500 ease-out z-10"
        :class="positionClass[tool.pos]"
        :style="{
          transform: `${getTransformBase(tool.pos)} scale(${activeIdx === i ? 1.15 : 1})`,
          opacity: activeIdx === null ? 1 : activeIdx === i ? 1 : 0.3,
        }"
        @click="select(i)"
      >
        <div
          class="px-3 py-2 rounded-lg border bg-[var(--color-bg-card)] flex items-center gap-2 transition-all"
          :class="
            activeIdx === i
              ? 'neon-border-green'
              : 'border-[var(--color-border-strong)] hover:border-[var(--color-skills)]/60'
          "
        >
          <Icon
            :name="tool.icon"
            class="w-4 h-4 transition-colors"
            :class="activeIdx === i ? 'text-[var(--color-skills)]' : 'text-[var(--color-text-muted)]'"
          />
          <span class="font-mono text-xs text-[var(--color-text)]">{{ tool.name }}</span>
        </div>
      </button>
    </div>

    <!-- Caption below the demo -->
    <div class="mt-2 min-h-[2.5rem] font-mono text-xs text-center">
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-y-1"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <p v-if="activeTool" :key="activeTool.name" class="text-[var(--color-text)]">
          <span class="glow-text-green">[{{ activeTool.name }}]</span>
          <span class="text-[var(--color-text-muted)]"> · {{ activeTool.description }}</span>
        </p>
        <p v-else key="idle" class="text-[var(--color-text-dim)]">
          // no active skill — click a tool
        </p>
      </Transition>
    </div>
  </div>
</template>

