<script setup lang="ts">
interface BadgeProps {
  bg?: string;
  color?: string;
}
// Define defaults for the props
const { bg = '#0057e9', color = '#ffffff' } = defineProps<BadgeProps>();
</script>

<template>
  <span v-if="$slots.default" class="badge">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  margin-right: 1rem;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  background-color: v-bind(bg);
  color: v-bind(color);
  box-shadow: 2px 2px 0px rgba(0, 0, 0);
}
</style>
