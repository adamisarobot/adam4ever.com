<script lang="ts" setup>
import '~/assets/styles/base.css';
const route = useRoute();
const useTitle = ref('Adam4ever');

useHead({
  titleTemplate: (title) => {
    useTitle.value = route ? `${title} - Adam4ever` : 'Adam4ever';
    return useTitle.value;
  },
  meta: [
    {
      name: 'description',
      content: 'Adam4ever - the blogroject',
    },
  ],
});
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<style scoped></style>
