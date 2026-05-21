<script setup lang="ts">
const { list } = useConcepts()

const rows = [
  {
    label: 'In 5 words',
    skills: 'reusable ability cards',
    subagents: 'delegated specialist interns',
    mcp: 'bridge to services',
    hooks: 'automatic event reactions',
  },
  {
    label: 'Reach for it when',
    skills: 'you want to teach a know-how',
    subagents: 'you want to delegate a task',
    mcp: 'you want to plug in a service',
    hooks: 'you want to automate on an event',
  },
  {
    label: 'How you set it up',
    skills: 'an .md file in /skills',
    subagents: 'an agent in /agents',
    mcp: 'MCP server config',
    hooks: 'an entry in settings.json',
  },
  {
    label: 'Who initiates',
    skills: 'Claude picks it up',
    subagents: 'Claude delegates',
    mcp: 'Claude calls out',
    hooks: 'the system fires it',
  },
]
</script>

<template>
  <section id="recap" class="relative px-6 py-24 z-10">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
          // section 03
        </p>
        <h2 class="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
          <span class="glow-text-cyan">Recap</span> at a glance.
        </h2>
      </div>

      <div
        class="terminal-frame overflow-x-auto"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <table class="w-full font-mono text-sm">
          <thead>
            <tr class="border-b border-[var(--color-border)]">
              <th class="p-4 text-left text-[var(--color-text-dim)] font-mono text-xs uppercase tracking-widest font-normal">
                #
              </th>
              <th
                v-for="c in list"
                :key="c.id"
                class="p-4 text-left font-mono text-sm uppercase tracking-wider"
                :style="{ color: c.hexAccent }"
              >
                {{ c.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, ri) in rows"
              :key="ri"
              class="border-b border-[var(--color-border)]/50 last:border-b-0 hover:bg-[var(--color-bg-elevated)]/30 transition-colors"
            >
              <td class="p-4 text-[var(--color-text-dim)] text-xs uppercase tracking-widest whitespace-nowrap">
                {{ row.label }}
              </td>
              <td class="p-4 text-[var(--color-text)]">{{ row.skills }}</td>
              <td class="p-4 text-[var(--color-text)]">{{ row.subagents }}</td>
              <td class="p-4 text-[var(--color-text)]">{{ row.mcp }}</td>
              <td class="p-4 text-[var(--color-text)]">{{ row.hooks }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
