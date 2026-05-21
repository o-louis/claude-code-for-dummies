<script setup lang="ts">
// Hooks : un événement déclenche une chaîne de dominos automatique

const events = [
  { trigger: 'PostToolUse', then: 'prettier --write', icon: 'lucide:wand' },
  { trigger: 'PreToolUse', then: 'block si tests rouges', icon: 'lucide:shield-check' },
  { trigger: 'Stop', then: 'notif slack', icon: 'lucide:bell' },
]

const activeHook = ref(0)
const triggered = ref(false)
const dominoStates = ref([0, 0, 0, 0]) // 0 = upright, 1 = falling, 2 = down

async function fire() {
  if (triggered.value) {
    triggered.value = false
    dominoStates.value = [0, 0, 0, 0]
    await nextTick()
  }
  triggered.value = true
  for (let i = 0; i < dominoStates.value.length; i++) {
    await new Promise((r) => setTimeout(r, 250))
    dominoStates.value[i] = 1
    setTimeout(() => {
      dominoStates.value[i] = 2
    }, 300)
  }
}
</script>

<template>
  <div class="terminal-frame p-6 bg-[var(--color-bg)]/40">
    <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">
      // choisis un hook, déclenche l'événement, regarde la cascade
    </p>

    <!-- Sélecteur d'événements -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="(e, i) in events"
        :key="e.trigger"
        class="font-mono text-[11px] px-2 py-1 rounded border transition-colors"
        :class="
          activeHook === i
            ? 'border-[var(--color-hooks)] text-[var(--color-hooks)]'
            : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-hooks)]/50'
        "
        @click="
          () => {
            activeHook = i
            triggered = false
            dominoStates = [0, 0, 0, 0]
          }
        "
      >
        on:{{ e.trigger }}
      </button>
    </div>

    <!-- Dominos -->
    <div class="relative h-32 flex items-end justify-center gap-3 perspective-[800px]">
      <div
        v-for="(_, i) in dominoStates"
        :key="i"
        class="w-6 h-20 origin-bottom transition-transform duration-300 ease-in rounded-sm border"
        :class="
          dominoStates[i] === 2
            ? 'bg-[var(--color-hooks)]/20 border-[var(--color-hooks)]/40'
            : 'bg-[var(--color-bg-card)] border-[var(--color-border-strong)]'
        "
        :style="{
          transform:
            dominoStates[i] === 0
              ? 'rotate(0deg)'
              : dominoStates[i] === 1
                ? 'rotate(45deg)'
                : 'rotate(90deg) translateY(8px)',
          boxShadow: dominoStates[i] >= 1 ? '0 0 12px rgb(255 149 88 / 0.5)' : 'none',
        }"
      ></div>

      <!-- Cible : l'action finale -->
      <div
        class="ml-4 px-3 py-2 rounded-lg border bg-[var(--color-bg-card)] transition-all duration-500 flex items-center gap-2"
        :class="
          dominoStates[3] === 2
            ? 'neon-border-orange animate-pulse-glow'
            : 'border-[var(--color-border-strong)]'
        "
      >
        <Icon :name="events[activeHook]!.icon" class="w-4 h-4 text-[var(--color-hooks)]" />
        <span class="font-mono text-xs text-[var(--color-text)]">{{ events[activeHook]!.then }}</span>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-hooks)] text-[var(--color-hooks)] hover:bg-[var(--color-hooks)]/10 transition-colors"
        @click="fire"
      >
        ⚡ déclencher {{ events[activeHook]!.trigger }}
      </button>
    </div>
  </div>
</template>
