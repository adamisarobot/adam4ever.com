<script setup lang="ts">
import type { Movie } from '~/types/firehose';

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <li class="corner-icon tmdb">
    <h2>{{ movie.original_title }} <Badge>added to watchlist</Badge></h2>
    <NuxtImg
      class="poster-image"
      :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
      :alt="movie.original_title"
    />

    <p>{{ movie.overview }}</p>

    <span class="timestamp">
      <NuxtTime :datetime="movie.created_at" />
    </span>
  </li>
</template>
