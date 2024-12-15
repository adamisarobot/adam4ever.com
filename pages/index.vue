<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').find()
);

useHead({
  title: 'The Blogroject',
  meta: [
    {
      name: 'description',
      content:
        'Adam4ever - the blogroject. Bloging about building a blog on the blog being built.',
    },
  ],
});
</script>

<template>
  <main>
    <section class="title">
      <h1 class="hero">Adam4ever</h1>
      <ul>
        <li v-for="blog in blogs">
          <NuxtLink :to="blog._path">
            {{ blog.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped></style>
