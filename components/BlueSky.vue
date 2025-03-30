<script setup lang="ts">
defineProps<{
  post: BskyPost | null;
}>();
</script>

<template>
  <li v-if="post" class="bsky-post">
    <img
      style="display: none"
      :src="post.author_avatar"
      :alt="post.author_displayName"
    />
    <h2>@{{ post.author_displayName }}</h2>
    <p>{{ post.record_text }}</p>
    <span class="timestamp">
      <NuxtTime :datetime="post.created_at" />
    </span>
  </li>
</template>

<style scoped>
.bsky-post {
  background-position: bottom right;
  background-size: 2rem;
  background-origin: content-box;
  background-image: url('/img/bsky.svg');
  background-repeat: no-repeat;
}
</style>
