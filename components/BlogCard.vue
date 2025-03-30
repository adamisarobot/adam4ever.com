<script setup lang="ts">
import type { BlogPost } from '~/types/firehose';
import Badge from './Badge.vue';

defineProps<{
  post: BlogPost;
}>();
</script>

<template v-if="post._draft === false">
  <li class="corner-icon nuxt">
    <span class="timestamp">
      <NuxtTime :datetime="post.created_at" />
    </span>
    <h2>
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </h2>
    <p>{{ post.description }}</p>
    <p class="blog-categories">
      <Badge v-for="cat in post.tags" :key="cat" bg="#0057e9" color="white">
        {{ cat }}
      </Badge>
    </p>
  </li>
</template>
