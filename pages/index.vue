<script lang="ts" setup>
import type {
  FirehoseData,
  Post,
  BlogPost,
  Movie,
  BskyPost,
  Book
} from '~/types/firehose';

const { data: firehose, error } = await useAsyncData<FirehoseData>(
  'firehose',
  () => $fetch<FirehoseData>('/api/fetch-firehose')
);

// Computed property to safely cast to array to avoid template TS errors
const posts = computed(() => {
  if (firehose.value && Array.isArray(firehose.value)) {
    return firehose.value as Post[];
  }
  return [];
});

useHead({
  title: 'The Blogroject'
});

// Type guards for narrowing down the post type
function isBlogPost(post: Post): post is BlogPost {
  return post && 'meta' in post && post.meta?.source === 'blog';
}

function isMovie(post: Post): post is Movie {
  return (post as Movie).meta?.source === 'tmdb';
}

function isBskyPost(post: Post): post is BskyPost {
  return (post as BskyPost).meta?.source === 'bluesky';
}

function isBook(post: Post): post is Book {
  return (post as Book).meta?.source === 'hardcover';
}

const colorMode = useColorMode();
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul v-if="!error && posts.length > 0" class="firehose">
        <template v-for="post in posts" :key="post.id">
          <BlogCard v-if="isBlogPost(post)" :post="post" />

          <BlueSky v-else-if="isBskyPost(post)" :post="post" />

          <template v-else-if="isMovie(post)">
            <TmdbCard v-if="colorMode.value === 'beta'" :movie="post" />
            <TMDBWatchlist v-else :movie="post" />
          </template>

          <HardCover v-else-if="isBook(post)" :book="post" />

          <pre v-else>{{ post }}</pre>
        </template>

        <!--
        <li v-if="song && !songError" class="corner-icon spotify">
          <h2>Recently played</h2>
          <p>{{ song.name }} - {{ song.artists[0].name }}</p>
          <p>
            <img
              :src="song.album_art[1].url"
              :alt="song.name"
              :width="song.album_art[1].width"
            />
          </p>
        </li> -->
      </ul>
      <div v-else-if="firehose && !Array.isArray(firehose) && 'error' in firehose" class="error-state">
        <p>{{ firehose.error }}</p>
        <pre v-if="firehose.message">{{ firehose.message }}</pre>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
