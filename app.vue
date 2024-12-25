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
      content: 'Bloging about building a blog on the blog being built.',
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <HeaderA4E />
    <NuxtPage />
  </div>
</template>

<style scoped></style>
