<script lang="ts" setup>
import '~/assets/styles/style.css';
const route = useRoute();
const useTitle = ref('Adam4ever');

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: (title) => {
    useTitle.value = route ? `${title} - Adam4ever` : 'Adam4ever';
    return useTitle.value;
  },
  meta: [
    {
      name: 'description',
      content: 'Blogging about building a blog on the blog being built.'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
});

useSeoMeta({
  ogDescription: 'Blogging about building a blog on the blog being built.',
  ogTitle: 'Adam4ever.com',
  ogImage: 'https://browser-worker.a4e.workers.dev?url=https://adam4ever.com',
  ogImageAlt: "A screenshot of the blog's homepage.",
  ogImageWidth: 1600,
  ogImageHeight: 900,
  ogUrl: 'https://adam4ever.com',
  twitterTitle: 'Adam4ever.com',
  twitterDescription: 'Blogging about building a blog on the blog being built.',
  twitterImage:
    'https://browser-worker.a4e.workers.dev?url=https://adam4ever.com',
  twitterCard: 'summary_large_image'
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <HeaderA4E />
    <NuxtPage />
    <FooterA4E />
  </div>
</template>

<style scoped></style>
