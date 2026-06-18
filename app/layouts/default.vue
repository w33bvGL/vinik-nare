<template>
  <div class="page-rail">
    <slot />
    <SectionFooter />
  </div>
  <GrainOverlay />
</template>

<style scoped>
.page-rail {
  max-width: var(--container-max);
  margin-inline: auto;
  border-left: 1px solid var(--color-divider);
  border-right: 1px solid var(--color-divider);
  min-height: 100dvh;
}

@media (max-width: 768px) {
  .page-rail {
    border-left: none;
    border-right: none;
  }
}
</style>
