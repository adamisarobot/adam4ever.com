<script setup lang="ts">
import type { Book } from '~/types/firehose';

defineProps<{
  book: Book;
}>();
</script>

<template>
  <li class="card corner-icon hardcover">
    <div class="card-image">
      <NuxtImg class="poster-image" :src="book.image_url" :alt="book.title" />
    </div>
    <div class="card-content">
      <h2>{{ book.title }}</h2>
      <NuxtImg class="poster-image" :src="book.image_url" :alt="book.title" />
      <p>{{ book.title }} - {{ book.author_name }}</p>
      <div class="card-badges">
        <Badge>readlist</Badge>
      </div>
    </div>
    <div class="card-meta">
      <span class="timestamp">
        <NuxtTime :datetime="book.created_at" />
      </span>
    </div>
  </li>
</template>