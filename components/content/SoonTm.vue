<template>
  <a>
    <span data-soon>soon</span>
    <span inert role="tooltip" class="tool-tip">
      <span v-if="props.date">Completed: <br /></span> {{ message }}</span
    >
  </a>
</template>

<script lang="ts" setup>
const props = defineProps({
  date: {
    type: String,
  },
});

const message = props.date ? props.date : 'Soon-ish? Maybe? :D';
</script>

<style scoped></style>
