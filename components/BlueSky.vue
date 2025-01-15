<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  post: BskyPost | null;
  error: NuxtError<unknown> | null;
}>();
</script>

<template>
  <!-- This whole thing needs a refactor, moved to component for now -->
  <!-- Desperately in need of a refactor. Please... help me... you are my only hope... -->
  <li class="bsky-post" v-if="error">{{ error }}</li>
  <li class="bsky-post" v-if="!error && !post">No posts found.</li>
  <li class="bsky-post" v-if="!error && post">
    <img
      style="display: none"
      :src="post.author.avatar"
      :alt="post.author.displayName"
    />
    <h2>@{{ post.author.handle }}</h2>
    <p>{{ post.record?.text }}</p>
    <p>{{ formatDatetime.UTCtoLocal(post.record?.createdAt) }}</p>
  </li>
</template>

<style scoped>
li {
  padding: 1rem;
  background-color: #fff;
  box-shadow: 4px 4px rgba(0, 0, 0, 1);
  border: 2px solid var(--slate-600);

  [data-theme='dark'] & {
    background-color: var(--slate-900);
    color: var(--slate-100);
    border-color: var(--slate-100);
    box-shadow: 4px 4px rgb(255, 255, 255);
  }
}

.bsky-post {
  background-position: bottom right;
  background-size: 2rem;
  background-origin: content-box;
  background-image: url('/img/bsky.svg');
  background-repeat: no-repeat;
}
</style>
