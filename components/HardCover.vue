<script setup lang="ts">
import type { Book } from '~/types/firehose';

const props = defineProps<{
  book: Book;
}>();

const truncatedDescription = computed(() => {
  const description = props.book.description;
  if (!description) {
    return 'No Description Available';
  }
  if (description.length > 360) {
    return description.substring(0, 360) + '...';
  }
  return description;
});
</script>

<template>
  <li class="card corner-icon hardcover">
    <div class="card-image">
      <NuxtImg class="poster-image" :src="book.image_url" :alt="book.title" />
    </div>
    <div class="card-content">
      <h2 :data-author="book.author_name">{{ book.title }}</h2>
      <NuxtImg class="poster-image" :src="book.image_url" :alt="book.title" />
      <!-- <p class="headline" v-if="book.headline">{{ book.headline }}</p> -->
      <p class="description">{{ truncatedDescription }}</p>
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
