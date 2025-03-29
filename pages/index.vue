<script lang="ts" setup>
import type { FirehoseData } from '~/types/firehose';

const { data: firehose, error } = await useAsyncData<FirehoseData>(
  'firehose',
  () => $fetch<FirehoseData>('/api/fetch-firehose')
);

useHead({
  title: 'The Blogroject'
});
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul v-if="!error && firehose" class="firehose">
        <template v-for="post in firehose" :key="post.id">
          <li
            v-if="post.meta.source !== 'bluesky' && post.meta.source !== 'tmdb'"
          >
            <span class="timestamp">
              <NuxtTime :datetime="post.created_at" />
            </span>
            <h2>
              <NuxtLink v-if="post.meta.source === 'blog'" :to="post._path">
                {{ post.title }}
              </NuxtLink>
              <span v-else>{{ post.title }}</span>
            </h2>
            <p></p>
          </li>

          <BlueSky v-else-if="post.meta.source === 'bluesky'" :post="post" />

          <TMDBWatchlist v-else-if="post.meta.source === 'tmdb'" :post="post" />
          <pre v-else>{{ post }}</pre>
        </template>

        <!--
        <li v-if="books && !bookError" class="corner-icon hardcover">
          <h2>Currently Reading</h2>
          <div class="box">
            <img
              :src="books.data.me[0].user_books[0].book.cached_image.url"
              :alt="books.data.me[0].user_books[0].book.title"
            />
            <p>{{ books.data.me[0].user_books[0].book.title }}</p>
        aaaaaaaa    <p>
              {{
                books.data.me[0].user_books[0].book.cached_contributors[0]
                  .author.name
              }}
            </p>
          </div>
        </li>

        <li v-if="movies && !movieError" class="corner-icon tmdb">
          <h2>Liked movie</h2>
          <p>{{ movies.results[0].original_title }}</p>

          <p>
            <img
              :src="
                TMDB_IMAGE_PATH +
                TMDB_IMAGE_WIDTH +
                movies.results[0].poster_path
              "
              :alt="movies.results[0].original_title"
            />
          </p>
        </li>

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
    </section>
  </main>
</template>

<style scoped></style>
