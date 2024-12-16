<script setup lang="ts">
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

const convertDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <!-- This needs a refactor, moved to component for now -->
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
    <h2>@{{ post.post.author.handle }}</h2>
    <p>{{ post.post.record.text }}</p>
    <p>{{ convertDate(post.post.record.createdAt) }}</p>
  </li>
</template>

<style scoped>
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
</style>
