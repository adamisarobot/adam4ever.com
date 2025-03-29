<script setup lang="ts"></script>

<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  background-color: var(--highlight);
  color: #fff;
  box-shadow: 2px 2px 0px rgba(0, 0, 0);
}
</style>
