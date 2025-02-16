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
    default: ''
  }
});

const message = props.date !== '' ? props.date : 'Soon-ish? Maybe? :D';
</script>

<style>
span[data-soon] {
  font-family: var(--font-sans);
  font-weight: 400;
  text-transform: uppercase;

  &:after {
    content: 'TM';
    font-size: 0.5em;
    vertical-align: super;
  }
}
</style>
