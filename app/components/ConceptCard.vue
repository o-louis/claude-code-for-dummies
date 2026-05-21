<script setup lang="ts">
import type { Concept } from '~/composables/useConcepts'

const props = defineProps<{
  concept: Concept
  expanded: boolean
}>()

defineEmits<{ toggle: [] }>()

const accentVar = computed(() => `var(--color-${props.concept.id})`)
const glowClass = computed(() => `neon-border-${props.concept.accent}`)
const glowText = computed(() => `glow-text-${props.concept.accent}`)
</script>

<template>
  <article
    class="terminal-frame transition-all duration-500 relative group"
    :class="[expanded ? glowClass : 'hover:border-[color-mix(in_srgb,' + concept.hexAccent + '_30%,transparent)]']"
  >
    <!-- Header — clickable to expand/collapse -->
    <button
      type="button"
      class="w-full flex items-start gap-4 p-6 md:p-8 text-left cursor-pointer"
      :aria-expanded="expanded"
      @click="$emit('toggle')"
    >
      <div
        class="font-mono text-xs px-2 py-1 rounded border"
        :style="{ color: accentVar, borderColor: accentVar }"
      >
        {{ concept.index }}
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <Icon :name="concept.icon" class="w-6 h-6" :style="{ color: accentVar }" />
          <h3 class="font-display text-2xl md:text-3xl font-bold" :class="glowText">{{ concept.name }}</h3>
        </div>
        <p class="text-[var(--color-text-muted)] text-sm md:text-base">{{ concept.tagline }}</p>
      </div>
      <span
        class="font-mono text-xs px-3 py-2 rounded border transition-all"
        :style="{
          color: accentVar,
          borderColor: expanded ? accentVar : 'var(--color-border-strong)',
        }"
      >
        {{ expanded ? '— close' : '+ open' }}
      </span>
    </button>

    <!-- Expanded body -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="expanded" class="overflow-hidden">
        <div class="border-t border-[var(--color-border)] px-6 md:px-8 py-6 md:py-8 grid md:grid-cols-2 gap-8">
          <!-- Left column: analogy + explanation -->
          <div class="space-y-6">
            <div>
              <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
                # analogie
              </p>
              <p class="font-display text-xl font-bold mb-2" :class="glowText">
                {{ concept.analogy.title }}
              </p>
              <p class="text-[var(--color-text)] leading-relaxed">{{ concept.analogy.line }}</p>
            </div>

            <div>
              <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
                # en clair
              </p>
              <p class="text-[var(--color-text)] leading-relaxed">{{ concept.pitch }}</p>
            </div>

            <div>
              <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
                # comment ça marche
              </p>
              <ol class="space-y-2">
                <li
                  v-for="(step, i) in concept.howItWorks"
                  :key="i"
                  class="flex gap-3 text-[var(--color-text)]"
                >
                  <span
                    class="font-mono text-xs mt-1 w-5 h-5 flex items-center justify-center rounded-full border shrink-0"
                    :style="{ color: accentVar, borderColor: accentVar }"
                  >
                    {{ i + 1 }}
                  </span>
                  <span class="leading-relaxed">{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- Right column: live demo + example -->
          <div class="space-y-6">
            <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
              # démo
            </p>
            <slot name="demo" />

            <div>
              <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
                # exemple
              </p>
              <div class="font-mono text-sm space-y-2 bg-[var(--color-bg)] rounded-lg p-4 border border-[var(--color-border)]">
                <div>
                  <span class="text-[var(--color-text-dim)]">you ▸</span>
                  <span class="text-[var(--color-text)] ml-2">{{ concept.example.prompt }}</span>
                </div>
                <div>
                  <span class="text-[var(--color-text-dim)]">claude ▸</span>
                  <span class="ml-2" :style="{ color: accentVar }">{{ concept.example.result }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bottom command bar -->
    <div
      class="px-6 md:px-8 py-3 font-mono text-xs border-t border-[var(--color-border)] flex items-center justify-between"
    >
      <span class="text-[var(--color-text-dim)]">{{ concept.command }}</span>
      <span :style="{ color: accentVar }">{{ expanded ? '● running' : '○ idle' }}</span>
    </div>
  </article>
</template>
