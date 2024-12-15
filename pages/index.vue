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
    <section id="feed" class="feed">
      <ul class="firehose">
        <li class="card" v-for="blog in blogs">
          <h2>
            <NuxtLink :to="blog._path">{{ blog.title }}</NuxtLink>
          </h2>

          <p>{{ blog.description }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.firehose {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
}

.card {
  padding: 1rem;
  border: 1px solid #eee;
}
</style>
