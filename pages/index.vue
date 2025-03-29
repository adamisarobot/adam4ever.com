<script lang="ts" setup>
const TMDB_IMAGE_PATH = 'https://image.tmdb.org/t/p/';
const TMDB_IMAGE_WIDTH = 'w185';

const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').sort({ date: -1 }).find()
);

const { data: song, error: songError } = await useAsyncData('lastSong', () =>
  $fetch('/api/fetch-spotify-song')
);

const { data: posts, error: postError } = await useAsyncData<BskyPost>(
  'bsky',
  () => $fetch('/api/fetch-bsky')
);

const { data: books, error: bookError } = await useAsyncData<BooksData>(
  'books',
  () => $fetch('/api/fetch-hardcover')
);

const { data: movies, error: movieError } = await useAsyncData<MoviesData>(
  'movies',
  () => $fetch('/api/fetch-tmdb')
);

const { data: firehose, error: firehoseError } = await useAsyncData(
  'firehose',
  () => $fetch('/api/fetch-firehose')
);

useHead({
  title: 'The Blogroject'
});
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul class="firehose">
        <template v-for="post in firehose" :key="post.id">
          <li v-if="post.meta.source !== 'bluesky'">
            <span class="timestamp">
              <NuxtTime :datetime="post.created_at" />
            </span>
            <h2>
              <!-- <NuxtLink :to="blog._path">{{ blog.title }}</NuxtLink> -->
              {{ post.title }}
            </h2>
            <p></p>
          </li>

          <Bluesky v-else :post="post" />
        </template>

        <!-- <BlueSky :post="posts" :error="postError" />

        <li v-if="books && !bookError" class="corner-icon hardcover">
          <h2>Currently Reading</h2>
          <div class="box">
            <img
              :src="books.data.me[0].user_books[0].book.cached_image.url"
              :alt="books.data.me[0].user_books[0].book.title"
            />
            <p>{{ books.data.me[0].user_books[0].book.title }}</p>
            <p>
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

<style scoped>
.firehose {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: none;
  padding: 0;

  li {
    position: relative;
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

  p {
    margin-top: 1rem;
    text-wrap: balance;
    text-wrap: pretty;
  }

  .box {
    display: flex;
    gap: 1rem;
  }

  .corner-icon {
    background-position: bottom right;
    background-size: 2rem;
    background-origin: content-box;

    background-repeat: no-repeat;
  }

  .bsky {
    background-image: url('/img/bsky.svg');
  }

  .hardcover {
    background-image: url('/img/hardcover.svg');
  }

  .tmdb {
    background-size: 100px;
    background-image: url('/img/tmdb.svg');
  }

  .spotify {
    background-image: url('/img/spotify.svg');
  }
}
/* -- Timestamp -- */
.timestamp {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.8rem;
  color: var(--slate-500);
  margin-bottom: 0.5rem;
}
</style>
