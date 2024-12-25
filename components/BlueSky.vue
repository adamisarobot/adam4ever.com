<script setup lang="ts">
import type { NuxtError } from '#app';

// Define FeedViewPost type
type FeedViewPost = {
  post: {
    author: {
      avatar: string;
      displayName: string;
      handle: string;
    };
    record: {
      text: string;
      createdAt: string;
    };
  };
};

// Define SerializeObject type
type SerializeObject<T> = T;

defineProps<{
  posts: SerializeObject<FeedViewPost>[] | null;
  error: NuxtError<unknown> | null;
}>();
</script>

<template>
  <!-- This whole thing needs a refactor, moved to component for now -->
  <li class="bsky-post" v-if="error">{{ error }}</li>
  <li class="bsky-post" v-if="!error && !posts">No posts found.</li>
  <li class="bsky-post" v-if="!error && posts" v-for="post in posts">
    <img
      style="display: none"
      :src="post.post.author.avatar"
      :alt="post.post.author.displayName"
    />
    <h2>@{{ post.post.author.handle }}</h2>
    <p>{{ post.post.record.text }}</p>
    <p>{{ formatDatetime.UTCtoLocal(post.post.record.createdAt) }}</p>
    <pre style="display: none">{{ formatData.bskyPost(post) }}</pre>
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
