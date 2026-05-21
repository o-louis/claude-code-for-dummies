# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page Nuxt 4 site that teaches the four core concepts of Claude Code (Skills, Subagents, MCP, Hooks) with plain-English analogies. UI copy is English; engineering artifacts are English too.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run preview    # preview the production build locally
npm run generate   # static generation
```

No test suite, no linter, no formatter configured.

## Architecture

Nuxt 4 with the `app/` source layout, Tailwind v4 via the Vite plugin (not the Nuxt module), `@vueuse/motion` registered globally in `app/plugins/motion.ts`, and `@nuxt/icon` using `lucide` icons.

**Single-page composition.** `app/pages/index.vue` stacks the whole site as five components: `ExpertModeBanner`, `HeroTerminal`, `ConceptGrid`, `Quiz`, `RecapTable`, `SiteFooter`. There is no router beyond this one page.

**Content lives in composables, not components.** This is the most important convention:
- `useConcepts.ts` — the four concepts (id, copy, analogy, accent color, icon). Adding/editing a concept = editing this file.
- `useTerminalCommands.ts` — every command the `HeroTerminal` can run (output lines, optional `effect: { type: 'scroll' | 'clear' }`). The `claude /help` entry is generated from the other commands.
- `useQuiz.ts` — quiz questions, each tagged with a `ConceptId` answer.
- `useKonami.ts` — Konami code listener; sets a global `useState('konami-unlocked')` that unlocks "expert mode" (banner + footer variant). Anything reacting to expert mode reads this state.

Components are presentation-only and pull data from these composables. To add content (a new concept, command, question), edit the composable — don't hardcode in a component.

**Theming.** All colors, fonts, shadows, and per-concept accents are defined as CSS custom properties in `@theme { ... }` inside `app/assets/css/main.css` (Tailwind v4 syntax). The `accent` field on a concept (`'green' | 'cyan' | 'purple' | 'orange'`) maps to utility classes like `neon-border-green` and `glow-text-green` defined in the same file, plus a CSS var `--color-{id}` keyed by concept id. Stay within this palette rather than introducing one-off hex values in components.

**Per-concept demo components.** `ConceptGrid` keeps a `demoByConcept` map from `ConceptId` to a component in `app/components/concepts/*Concept.vue`. Adding a new concept means: extend the `ConceptId` union in `useConcepts.ts`, append to the list, create a matching `XxxConcept.vue`, and register it in that map.

## Conventions specific to this repo

- All user-facing copy is in English (see `app.head` in `nuxt.config.ts` and the recent translation commit). Keep it that way.
- Concept ids are the join key across composables (`useConcepts`, `useQuiz`, `demoByConcept`, CSS vars `--color-{id}`). Renaming one means updating all of them.
- The `HeroTerminal` boot animation, autocomplete (Tab), and history (↑/↓) are all driven by `useTerminalCommands` — extend commands there rather than wiring new logic in the component.
