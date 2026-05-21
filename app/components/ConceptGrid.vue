<script setup lang="ts">
import type { ConceptId } from '~/composables/useConcepts'
import SkillsConcept from '~/components/concepts/SkillsConcept.vue'
import SubagentsConcept from '~/components/concepts/SubagentsConcept.vue'
import McpConcept from '~/components/concepts/McpConcept.vue'
import HooksConcept from '~/components/concepts/HooksConcept.vue'

const { list } = useConcepts()
const expanded = ref<ConceptId | null>(null)

function toggle(id: ConceptId) {
  expanded.value = expanded.value === id ? null : id
}

const demoByConcept = {
  skills: SkillsConcept,
  subagents: SubagentsConcept,
  mcp: McpConcept,
  hooks: HooksConcept,
}
</script>

<template>
  <section id="concepts" class="relative px-6 py-24 z-10">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
          // section 01
        </p>
        <h2 class="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
          Les <span class="glow-text-green">4 concepts</span><br />
          à connaître.
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] max-w-xl text-lg">
          Clique sur une carte pour la déplier. Chaque concept vient avec son analogie, son
          explication et une mini-démo interactive.
        </p>
      </div>

      <!-- Grid -->
      <div class="space-y-4">
        <ConceptCard
          v-for="concept in list"
          :key="concept.id"
          :concept="concept"
          :expanded="expanded === concept.id"
          @toggle="toggle(concept.id)"
        >
          <template #demo>
            <component :is="demoByConcept[concept.id]" />
          </template>
        </ConceptCard>
      </div>
    </div>
  </section>
</template>
