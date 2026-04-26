<script setup lang="ts">
import type { Movie } from '~/types/firehose';

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <li class="card corner-icon tmdb">
    <div class="card-image">
      <NuxtImg
        class="poster-image"
        :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
        :alt="movie.original_title"
      />
    </div>
    <div class="card-content">
      <h2>{{ movie.original_title }}</h2>
      <NuxtImg
        class="poster-image"
        :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
        :alt="movie.original_title"
      />
      <p>{{ movie.overview }}</p>
      <div class="card-badges">
        <Badge>watchlist</Badge>
      </div>
    </div>
    <div class="card-meta">
      <span class="timestamp">
        <NuxtTime :datetime="movie.created_at" />
      </span>
    </div>
  </li>
</template>
