<script setup lang="ts">
import confetti from 'canvas-confetti'
import type { ConceptId } from '~/composables/useConcepts'

const { list: questions } = useQuiz()
const { list: concepts } = useConcepts()

const currentIdx = ref(0)
const selected = ref<ConceptId | null>(null)
const showFeedback = ref(false)
const score = ref(0)
const answered = ref<boolean[]>([])

const current = computed(() => questions[currentIdx.value]!)
const isCorrect = computed(() => selected.value === current.value.answer)
const isFinished = computed(() => currentIdx.value >= questions.length)

const cardRef = ref<HTMLElement | null>(null)

function pick(id: ConceptId) {
  if (showFeedback.value) return
  selected.value = id
  showFeedback.value = true
  if (id === current.value.answer) {
    score.value++
    fireConfetti()
  } else {
    cardRef.value?.classList.add('animate-shake')
    setTimeout(() => cardRef.value?.classList.remove('animate-shake'), 500)
  }
}

function next() {
  answered.value[currentIdx.value] = isCorrect.value
  currentIdx.value++
  selected.value = null
  showFeedback.value = false
}

function reset() {
  currentIdx.value = 0
  selected.value = null
  showFeedback.value = false
  score.value = 0
  answered.value = []
}

function fireConfetti() {
  const colors = ['#00ffa3', '#5cf2ff', '#b66cff', '#ff9558']
  confetti({
    particleCount: 80,
    angle: 90,
    spread: 70,
    startVelocity: 40,
    origin: { x: 0.5, y: 0.6 },
    colors,
    ticks: 120,
    scalar: 0.9,
  })
}

const finalRating = computed(() => {
  const total = questions.length
  const ratio = score.value / total
  if (ratio === 1) return { label: 'sans-faute', glow: 'green', message: 'Tu maîtrises. Va prêcher la bonne parole.' }
  if (ratio >= 0.7) return { label: 'solide', glow: 'cyan', message: 'Tu peux te lancer sans crainte.' }
  if (ratio >= 0.4) return { label: 'en chemin', glow: 'purple', message: 'Relis les concepts plus haut, puis re-essaie.' }
  return { label: 'à reprendre', glow: 'orange', message: 'Remonte tout en haut, prends ton temps, ça va venir.' }
})

function getOptionClass(id: ConceptId): string {
  if (!showFeedback.value) {
    return 'border-[var(--color-border-strong)] hover:border-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]'
  }
  if (id === current.value.answer) {
    return 'border-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10'
  }
  if (id === selected.value) {
    return 'border-[var(--color-neon-pink)] bg-[var(--color-neon-pink)]/10'
  }
  return 'border-[var(--color-border)] opacity-50'
}
</script>

<template>
  <section id="quiz" class="relative px-6 py-24 z-10">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="mb-10">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
          // section 02
        </p>
        <h2 class="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
          <span class="glow-text-purple">Quel outil</span><br />
          pour quel besoin ?
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] text-lg">
          {{ questions.length }} situations concrètes. À chaque fois : choisis le bon concept.
        </p>
      </div>

      <!-- Progress -->
      <div v-if="!isFinished" class="mb-6 flex items-center gap-2">
        <div class="flex-1 h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-purple)] transition-all duration-500"
            :style="{ width: `${(currentIdx / questions.length) * 100}%` }"
          ></div>
        </div>
        <span class="font-mono text-xs text-[var(--color-text-muted)]">
          {{ currentIdx + 1 }} / {{ questions.length }}
        </span>
      </div>

      <!-- Question card -->
      <div v-if="!isFinished" ref="cardRef" class="terminal-frame">
        <div class="p-6 md:p-8">
          <p class="font-mono text-xs text-[var(--color-text-dim)] mb-3">
            // situation
            <span v-if="current.hint" class="ml-2 text-[var(--color-text-muted)]"> — indice : {{ current.hint }}</span>
          </p>
          <p class="font-display text-xl md:text-2xl text-[var(--color-text)] mb-6 leading-snug">
            {{ current.situation }}
          </p>

          <!-- Options -->
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="concept in concepts"
              :key="concept.id"
              class="px-4 py-3 rounded-lg border text-left transition-all flex items-center gap-3 group disabled:cursor-not-allowed"
              :class="getOptionClass(concept.id)"
              :disabled="showFeedback"
              @click="pick(concept.id)"
            >
              <Icon
                :name="concept.icon"
                class="w-5 h-5 transition-transform group-hover:scale-110"
                :style="{ color: concept.hexAccent }"
              />
              <span class="font-mono text-sm text-[var(--color-text)]">{{ concept.name }}</span>
              <span v-if="showFeedback && concept.id === current.answer" class="ml-auto">
                <Icon name="lucide:check-circle-2" class="w-5 h-5 text-[var(--color-neon-green)]" />
              </span>
              <span v-else-if="showFeedback && concept.id === selected" class="ml-auto">
                <Icon name="lucide:x-circle" class="w-5 h-5 text-[var(--color-neon-pink)]" />
              </span>
            </button>
          </div>

          <!-- Feedback -->
          <Transition
            enter-active-class="transition-all duration-400"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="showFeedback"
              class="mt-6 p-4 rounded-lg border"
              :class="
                isCorrect
                  ? 'border-[var(--color-neon-green)]/40 bg-[var(--color-neon-green)]/5'
                  : 'border-[var(--color-neon-pink)]/40 bg-[var(--color-neon-pink)]/5'
              "
            >
              <p class="font-mono text-xs mb-2" :class="isCorrect ? 'glow-text-green' : 'text-[var(--color-neon-pink)]'">
                {{ isCorrect ? '✓ exact' : '✗ raté' }}
              </p>
              <p class="text-[var(--color-text)] text-sm leading-relaxed">
                {{ current.explanation }}
              </p>
              <button
                class="mt-4 font-mono text-xs px-4 py-2 rounded border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)]/10 transition-colors"
                @click="next"
              >
                {{ currentIdx + 1 < questions.length ? 'suivante →' : 'voir le score →' }}
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Final score -->
      <div v-else class="terminal-frame p-8 md:p-12 text-center">
        <p class="font-mono text-xs text-[var(--color-text-dim)] mb-4">// rapport final</p>
        <p class="font-display text-7xl md:text-8xl font-bold mb-3" :class="`glow-text-${finalRating.glow}`">
          {{ score }}<span class="text-[var(--color-text-muted)] text-4xl">/{{ questions.length }}</span>
        </p>
        <p class="font-mono text-sm uppercase tracking-widest mb-6" :class="`glow-text-${finalRating.glow}`">
          [ {{ finalRating.label }} ]
        </p>
        <p class="text-[var(--color-text)] text-lg mb-8">{{ finalRating.message }}</p>

        <div class="flex flex-wrap gap-2 justify-center mb-8">
          <span
            v-for="(ok, i) in answered"
            :key="i"
            class="w-8 h-8 rounded flex items-center justify-center font-mono text-xs border"
            :class="
              ok
                ? 'border-[var(--color-neon-green)] text-[var(--color-neon-green)]'
                : 'border-[var(--color-neon-pink)] text-[var(--color-neon-pink)]'
            "
          >
            {{ ok ? '✓' : '✗' }}
          </span>
        </div>

        <button
          class="font-mono text-sm px-5 py-2 rounded border border-[var(--color-neon-green)] text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/10 transition-colors"
          @click="reset"
        >
          ↻ recommencer
        </button>
      </div>
    </div>
  </section>
</template>

