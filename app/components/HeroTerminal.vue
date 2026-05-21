<script setup lang="ts">
const lines = [
  { text: '$ claude --help', kind: 'cmd' as const, delay: 60 },
  { text: 'Welcome, human.', kind: 'out' as const, delay: 30 },
  { text: 'Here are the 4 concepts behind the magic of Claude Code:', kind: 'out' as const, delay: 25 },
  { text: '  → Skills', kind: 'skill' as const, delay: 25 },
  { text: '  → Subagents', kind: 'subagent' as const, delay: 25 },
  { text: '  → MCP', kind: 'mcp' as const, delay: 25 },
  { text: '  → Hooks', kind: 'hook' as const, delay: 25 },
  { text: '$ scroll to explore ↓', kind: 'cmd' as const, delay: 60 },
]

type Line = (typeof lines)[number]

const typed = ref<Array<{ text: string; kind: Line['kind']; partial: string }>>([])
const currentLine = ref(0)
const currentChar = ref(0)
const done = ref(false)

async function typeWriter() {
  for (let i = 0; i < lines.length; i++) {
    currentLine.value = i
    typed.value.push({ text: lines[i]!.text, kind: lines[i]!.kind, partial: '' })
    for (let j = 1; j <= lines[i]!.text.length; j++) {
      currentChar.value = j
      typed.value[i]!.partial = lines[i]!.text.slice(0, j)
      await new Promise((r) => setTimeout(r, lines[i]!.delay))
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  done.value = true
}

onMounted(() => {
  typeWriter()
})

const kindClass = (kind: Line['kind']) => {
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
    default:
      return 'text-[var(--color-text)]'
  }
}

function scrollToConcepts() {
  document.getElementById('concepts')?.scrollIntoView({ behavior: 'smooth' })
}
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
      <div class="px-6 py-6 font-mono text-sm md:text-base min-h-[280px] relative">
        <div v-for="(line, idx) in typed" :key="idx" :class="kindClass(line.kind)">
          <span>{{ line.partial }}</span>
          <span
            v-if="idx === currentLine && !done"
            class="inline-block w-2 h-4 bg-current ml-0.5 align-middle"
            style="animation: blink 1s steps(2) infinite"
          ></span>
        </div>
        <div v-if="done" class="mt-2 text-[var(--color-neon-green)] blink-cursor"></div>
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
