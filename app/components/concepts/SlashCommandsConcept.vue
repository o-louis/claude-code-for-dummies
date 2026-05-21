<script setup lang="ts">
// Slash commands: a small command palette. Click one to "execute" it.
interface Command {
  name: string
  hint: string
  result: string
  icon: string
}

const commands: Command[] = [
  {
    name: '/help',
    hint: 'lists every available command',
    result: 'opens the full command index for this session',
    icon: 'lucide:circle-help',
  },
  {
    name: '/clear',
    hint: 'wipes the conversation context',
    result: 'context cleared — fresh start, memory kept',
    icon: 'lucide:eraser',
  },
  {
    name: '/init',
    hint: 'generates a CLAUDE.md from this repo',
    result: 'analyzed the repo → wrote CLAUDE.md with stack + conventions',
    icon: 'lucide:file-plus-2',
  },
  {
    name: '/agents',
    hint: 'manages your subagents',
    result: 'opens the subagent picker (create, edit, delete)',
    icon: 'lucide:users-round',
  },
]

const activeIdx = ref<number | null>(null)
const justFired = ref(false)

function run(i: number) {
  activeIdx.value = i
  justFired.value = false
  // tiny delay to retrigger the animation when the same one is clicked twice
  requestAnimationFrame(() => (justFired.value = true))
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // type a slash, pick a command, watch it run
    </p>

    <!-- Fake input bar -->
    <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
      <Icon name="lucide:square-slash" class="w-4 h-4 text-[var(--color-slashcommands)]" />
      <span class="font-mono text-xs text-[var(--color-text)]">
        {{ activeIdx !== null ? commands[activeIdx]!.name : '/' }}
      </span>
      <span class="blink-cursor text-[var(--color-slashcommands)]"></span>
    </div>

    <!-- Command palette -->
    <div class="space-y-1.5 mb-4">
      <button
        v-for="(cmd, i) in commands"
        :key="cmd.name"
        class="w-full text-left flex items-center gap-3 px-3 py-2 rounded border transition-all"
        :class="
          activeIdx === i
            ? 'border-[var(--color-slashcommands)]/60 bg-[var(--color-slashcommands)]/10'
            : 'border-[var(--color-border)] hover:border-[var(--color-slashcommands)]/40'
        "
        @click="run(i)"
      >
        <Icon
          :name="cmd.icon"
          class="w-4 h-4 shrink-0"
          :class="activeIdx === i ? 'text-[var(--color-slashcommands)]' : 'text-[var(--color-text-muted)]'"
        />
        <span class="font-mono text-xs text-[var(--color-text)]">{{ cmd.name }}</span>
        <span class="font-mono text-[11px] text-[var(--color-text-muted)] ml-auto truncate">
          {{ cmd.hint }}
        </span>
      </button>
    </div>

    <!-- Output -->
    <div class="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-3 min-h-[3rem]">
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-y-1"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <p
          v-if="activeIdx !== null && justFired"
          :key="activeIdx"
          class="font-mono text-xs leading-relaxed"
        >
          <span class="text-[var(--color-slashcommands)]">$ {{ commands[activeIdx]!.name }}</span>
          <span class="block mt-1 text-[var(--color-text)]">→ {{ commands[activeIdx]!.result }}</span>
        </p>
        <p v-else key="idle" class="font-mono text-xs text-[var(--color-text-dim)]">
          // pick a command above
        </p>
      </Transition>
    </div>
  </div>
</template>
