<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').find()
);

const books = ref<any[]>([]);
const loading = ref(true);
onMounted(async () => {
  try {
    books.value = await $fetch('/api/fetch-hardcover');
  } catch (err: any) {
    books.value = err.message;
  } finally {
    loading.value = false;
  }
});

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

        <li v-if="loading">Loading...</li>
        <li v-if="books.length === 0 && !loading">No books found.</li>
        <li v-for="book in books" :key="book.id">
          <h3>{{ book.title }}</h3>
          <p>{{ book.author }}</p>
          <p>{{ book.published }}</p>
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
