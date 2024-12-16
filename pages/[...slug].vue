<script lang="ts" setup>
const path = useRoute().fullPath;
useHead({
  title: 'Adam4ever - the blogroject',
  meta: [
    {
      name: 'description',
      content: 'Adam4ever - the blogroject',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://adam4ever.com${path}`,
    },
  ],
});
</script>

<template>
  <main class="wide">
    <div class="feed">
      <ContentDoc />
      <div class="return">
        <NuxtLink to="/">Back</NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wide {
  grid-template-columns: 1fr 800px 1fr;
}

.return {
  margin-top: 1rem;
  text-align: right;
}
</style>
