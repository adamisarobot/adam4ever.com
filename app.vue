<script lang="ts" setup>
import '~/assets/styles/base.css';

useHead({
  title: 'Adam4ever',
  meta: [
    {
      name: 'description',
      content: 'Adam4ever is a website about Adam.',
    },
  ],
});

useSeoMeta({
  title: 'Adam4ever',
  ogTitle: 'Adam4ever',
  description: 'Adam4ever is a website about Adam.',
  ogDescription: 'Adam4ever is a website about Adam.',
  ogImage: '',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<style scoped></style>
