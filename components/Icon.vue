<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const iconPath = computed(() => {
  switch (props.name) {
    case 'ph:list-bold':
      return 'M212,128a12,12,0,0,1-12,12H56a12,12,0,0,1,0-24H200A12,12,0,0,1,212,128Zm-12,52H56a12,12,0,0,0,0,24H200a12,12,0,0,0,0-24Zm0-104H56a12,12,0,0,0,0,24H200a12,12,0,0,0,0-24Z';
    case 'ph:heart-fill':
      return 'M240,94c0,70-103.76,127.74-108.81,130.43a8,8,0,0,1-7.56,0C118.59,221.74,16,164,16,94A62.07,62.07,0,0,1,122,50.71,62.07,62.07,0,0,1,240,94Z';
    case 'ph:bookmark-simple-fill':
      return 'M192,24H64A16,16,0,0,0,48,40V224a8,8,0,0,0,12.65,6.51L128,181.33l67.35,49.18A8,8,0,0,0,208,224V40A16,16,0,0,0,192,24Z';
    default:
      return 'M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Z';
  }
});
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 256 256" 
    class="a4e-icon"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path :d="iconPath" />
  </svg>
</template>

<style scoped>
.a4e-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
