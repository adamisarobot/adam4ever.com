<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const posts = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    posts.value = await $fetch('/api/fetch-bsky');
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

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

const convertDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
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
        <li class="bsky-post" v-if="loading">Loading...</li>
        <li class="bsky-post" v-if="error">{{ error }}</li>
        <li class="bsky-post" v-if="!loading && !error && !posts.length">
          No posts found.
        </li>
        <li
          class="bsky-post"
          v-if="!loading && !error && posts.length"
          v-for="post in posts"
        >
          <img
            style="display: none"
            :src="post.post.author.avatar"
            :alt="post.post.author.displayName"
          />
          <h2>{{ post.post.author.displayName }}</h2>
          <p>{{ post.post.record.text }}</p>
          <p>{{ convertDate(post.post.record.createdAt) }}</p>
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
    border: 1px solid #eee;
  }

  .bsky-post {
    background-position: bottom right;
    background-size: 2rem;
    background-origin: content-box;
    background-image: url('/img/bsky.svg');
    background-repeat: no-repeat;
    border-color: var(--bsky);
  }
}
</style>
