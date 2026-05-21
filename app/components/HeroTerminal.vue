<script setup lang="ts">
import type { TerminalLine, TerminalLineKind } from '~/composables/useTerminalCommands'

const { findExact, findSuggestion, unknownOutput } = useTerminalCommands()

interface BootLine {
  text: string
  kind: TerminalLineKind
  partial: string
}

const bootLinesSpec = [
  { text: '$ claude --help', kind: 'cmd' as TerminalLineKind, delay: 55 },
  { text: 'Welcome, human.', kind: 'out' as TerminalLineKind, delay: 25 },
  { text: '4 concepts behind the magic of Claude Code:', kind: 'out' as TerminalLineKind, delay: 22 },
  { text: '  → Skills', kind: 'skill' as TerminalLineKind, delay: 22 },
  { text: '  → Subagents', kind: 'subagent' as TerminalLineKind, delay: 22 },
  { text: '  → MCP', kind: 'mcp' as TerminalLineKind, delay: 22 },
  { text: '  → Hooks', kind: 'hook' as TerminalLineKind, delay: 22 },
  { text: 'type a command, or hit Tab to autocomplete.', kind: 'dim' as TerminalLineKind, delay: 18 },
]

const bootLines = ref<BootLine[]>([])
const bootCurrentIdx = ref(0)
const bootDone = ref(false)

const history = ref<Array<{ command: string; output: TerminalLine[] }>>([])
const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const scrollContainer = ref<HTMLDivElement | null>(null)
const commandHistory = ref<string[]>([])
const historyCursor = ref<number | null>(null)

const ghost = computed(() => {
  if (!input.value) return ''
  const sugg = findSuggestion(input.value)
  if (!sugg) return ''
  return sugg.name.slice(input.value.length)
})

async function typeWriter() {
  for (let i = 0; i < bootLinesSpec.length; i++) {
    const spec = bootLinesSpec[i]!
    bootCurrentIdx.value = i
    bootLines.value.push({ text: spec.text, kind: spec.kind, partial: '' })
    for (let j = 1; j <= spec.text.length; j++) {
      bootLines.value[i]!.partial = spec.text.slice(0, j)
      await new Promise((r) => setTimeout(r, spec.delay))
    }
    await new Promise((r) => setTimeout(r, 180))
  }
  bootDone.value = true
  await nextTick()
  inputEl.value?.focus({ preventScroll: true })
}

function scrollTerminalToBottom() {
  nextTick(() => {
    const el = scrollContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function executeCommand(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) return

  commandHistory.value.push(trimmed)
  historyCursor.value = null

  const cmd = findExact(trimmed)
  if (!cmd) {
    history.value.push({ command: trimmed, output: unknownOutput(trimmed) })
    return
  }

  if (cmd.effect?.type === 'clear') {
    history.value = []
    return
  }

  history.value.push({ command: trimmed, output: cmd.output })

  if (cmd.effect?.type === 'scroll') {
    const target = cmd.effect.target
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 700)
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    executeCommand(input.value)
    input.value = ''
    scrollTerminalToBottom()
  } else if (e.key === 'Tab') {
    e.preventDefault()
    const sugg = findSuggestion(input.value)
    if (sugg) input.value = sugg.name
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (commandHistory.value.length === 0) return
    if (historyCursor.value === null) {
      historyCursor.value = commandHistory.value.length - 1
    } else if (historyCursor.value > 0) {
      historyCursor.value -= 1
    }
    input.value = commandHistory.value[historyCursor.value] ?? ''
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyCursor.value === null) return
    if (historyCursor.value < commandHistory.value.length - 1) {
      historyCursor.value += 1
      input.value = commandHistory.value[historyCursor.value] ?? ''
    } else {
      historyCursor.value = null
      input.value = ''
    }
  }
}

function focusInput() {
  inputEl.value?.focus({ preventScroll: true })
}

const kindClass = (kind: TerminalLineKind) => {
  switch (kind) {
    case 'cmd':
      return 'glow-text-green'
    case 'skill':
      return 'text-[var(--color-skills)]'
    case 'subagent':
      return 'text-[var(--color-subagents)]'
    case 'mcp':
      return 'text-[var(--color-mcp)]'
    case 'hook':
      return 'text-[var(--color-hooks)]'
    case 'error':
      return 'text-[var(--color-neon-pink)]'
    case 'success':
      return 'glow-text-green'
    case 'highlight':
      return 'glow-text-purple'
    case 'dim':
      return 'text-[var(--color-text-dim)]'
    default:
      return 'text-[var(--color-text)]'
  }
}

function scrollToConcepts() {
  document.getElementById('concepts')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  typeWriter()
})
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 z-10">
    <!-- Title -->
    <div
      class="mb-12 text-center"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-4">
        // a visual guide for beginners
      </p>
      <h1 class="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
        <span class="block text-[var(--color-text)]">CLAUDE CODE</span>
        <span class="block">
          <span class="glow-text-green">FOR</span>
          <span class="glow-text-purple"> DUMMIES</span>
        </span>
      </h1>
      <p class="mt-6 text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
        4 concepts, 4 analogies. By the end of this page, you'll know what Claude Code can do for you.
      </p>
    </div>

    <!-- Terminal -->
    <div
      class="terminal-frame w-full max-w-3xl"
      @click="focusInput"
      v-motion
      :initial="{ opacity: 0, y: 40, scale: 0.96 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 700, delay: 300 } }"
    >
      <div class="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]/40">
        <span class="w-3 h-3 rounded-full bg-[#ff5c5c]"></span>
        <span class="w-3 h-3 rounded-full bg-[#ffbd44]"></span>
        <span class="w-3 h-3 rounded-full bg-[#00ca56]"></span>
        <span class="ml-3 font-mono text-xs text-[var(--color-text-dim)]">~/claude-code-for-dummies</span>
      </div>
      <div
        ref="scrollContainer"
        class="px-6 py-6 font-mono text-sm md:text-base h-[360px] overflow-y-auto relative"
        style="white-space: pre-wrap"
      >
        <!-- Boot animation -->
        <div v-for="(line, idx) in bootLines" :key="'boot-' + idx" :class="kindClass(line.kind)">
          <span>{{ line.partial }}</span>
          <span
            v-if="!bootDone && idx === bootCurrentIdx"
            class="inline-block w-2 h-4 bg-current ml-0.5 align-middle"
            style="animation: blink 1s steps(2) infinite"
          ></span>
        </div>

        <!-- Executed history -->
        <div v-for="(entry, idx) in history" :key="'h-' + idx" class="mt-3">
          <div class="glow-text-green">$ {{ entry.command }}</div>
          <div v-for="(line, lidx) in entry.output" :key="lidx" :class="kindClass(line.kind)">
            {{ line.text }}
          </div>
        </div>

        <!-- Active prompt -->
        <div v-if="bootDone" class="mt-3 relative">
          <span class="glow-text-green">$ </span><span class="text-[var(--color-text)]">{{ input }}</span><span
            v-if="ghost"
            class="text-[var(--color-text-dim)]"
          >{{ ghost }}</span><span
            class="inline-block w-2 h-4 bg-[var(--color-neon-green)] ml-0.5 align-middle"
            style="animation: blink 1s steps(2) infinite"
          ></span>
          <input
            ref="inputEl"
            v-model="input"
            class="absolute inset-0 w-full h-full opacity-0 outline-none border-none bg-transparent caret-transparent"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            aria-label="Terminal command input"
            @keydown="onKeyDown"
          />
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <button
      class="mt-12 group flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-neon-green)] transition-colors"
      @click="scrollToConcepts"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 1800, duration: 600 } }"
    >
      <span class="font-mono text-xs uppercase tracking-widest">Explore</span>
      <Icon name="lucide:chevron-down" class="w-5 h-5 animate-float group-hover:text-[var(--color-neon-green)]" />
    </button>
  </section>
</template>
