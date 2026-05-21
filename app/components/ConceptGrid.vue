<script setup lang="ts">
import type { ConceptId } from '~/composables/useConcepts'
import SkillsConcept from '~/components/concepts/SkillsConcept.vue'
import SubagentsConcept from '~/components/concepts/SubagentsConcept.vue'
import McpConcept from '~/components/concepts/McpConcept.vue'
import HooksConcept from '~/components/concepts/HooksConcept.vue'
import ClaudeMdConcept from '~/components/concepts/ClaudeMdConcept.vue'
import SlashCommandsConcept from '~/components/concepts/SlashCommandsConcept.vue'
import PlanModeConcept from '~/components/concepts/PlanModeConcept.vue'

const { list, bonus } = useConcepts()
const expanded = ref<ConceptId | null>(null)

function toggle(id: ConceptId) {
  expanded.value = expanded.value === id ? null : id
}

const demoByConcept = {
  skills: SkillsConcept,
  subagents: SubagentsConcept,
  mcp: McpConcept,
  hooks: HooksConcept,
  claudemd: ClaudeMdConcept,
  slashcommands: SlashCommandsConcept,
  planmode: PlanModeConcept,
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
          The <span class="glow-text-green">4 concepts</span><br />
          to know.
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] max-w-xl text-lg">
          Click a card to open it. Every concept comes with its analogy, a plain-English
          explanation, and a hands-on mini demo.
        </p>
      </div>

      <!-- Core grid -->
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

      <!-- Bonus section -->
      <div class="mt-20 mb-8">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
          // bonus
        </p>
        <h3 class="font-display text-2xl md:text-3xl font-bold leading-tight">
          <span class="glow-text-yellow">3 more</span> you'll meet on day one.
        </h3>
        <p class="mt-3 text-[var(--color-text-muted)] max-w-xl text-sm">
          Less fundamental than the core four, but you'll bump into these the moment you open
          Claude Code.
        </p>
      </div>

      <div class="space-y-4">
        <ConceptCard
          v-for="concept in bonus"
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
