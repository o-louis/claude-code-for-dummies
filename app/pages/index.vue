<script setup lang="ts">
const { unlocked: expertMode } = useKonami()
</script>

<template>
  <main class="relative">
    <ExpertModeBanner :active="expertMode" />
    <HeroTerminal />
    <ConceptGrid />
    <Quiz />
    <RecapTable />
    <SiteFooter :expert-mode="expertMode" />
  </main>
</template>
