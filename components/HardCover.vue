<script setup lang="ts">
import type { Book } from '~/types/firehose';

defineProps<{
  book: Book;
}>();
</script>

<template>
  <li class="corner-icon hardcover">
    <h2>{{ book.title }} <Badge>want to read</Badge></h2>
    <div class="box">
      <img class="poster-image" :src="book.image_url" :alt="book.title" />
      <p>{{ book.title }}</p>
      <p>
        {{ book.author_name }}
      </p>
      <span class="timestamp">
        <NuxtTime :datetime="book.created_at" />
      </span>
    </div>
  </li>
</template>

<style scoped></style>
