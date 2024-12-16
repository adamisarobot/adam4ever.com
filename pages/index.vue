<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').find()
);

useHead({
  title: 'The Blogroject',
});
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul class="firehose">
        <li v-for="blog in blogs">
          <h2>
            <NuxtLink :to="blog._path">{{ blog.title }}</NuxtLink>
          </h2>
          <p>{{ blog.description }}</p>
        </li>
        <BlueSky />
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

  li {
    padding: 1rem;
    background-color: #fff;
    box-shadow: 4px 4px rgba(0, 0, 0, 1);
    border: 2px solid var(--slate-600);
  }

  .bsky-post {
    background-position: bottom right;
    background-size: 2rem;
    background-origin: content-box;
    background-image: url('/img/bsky.svg');
    background-repeat: no-repeat;
  }
}
</style>
