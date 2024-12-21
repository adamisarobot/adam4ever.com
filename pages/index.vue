<script lang="ts" setup>
const loading = ref(true);
const TMDB_IMAGE_PATH = 'https://image.tmdb.org/t/p/';
const TMDB_IMAGE_WIDTH = 'w185';

const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').find()
);

const { data, error } = await useAsyncData<BooksData>('books', () =>
  $fetch('/api/fetch-hardcover')
).then((data) => {
  loading.value = false;
  return data;
});

const { data: movies, error: movieError } = await useAsyncData<MoviesData>(
  'movies',
  () => $fetch('/api/fetch-tmdb')
).then((data) => {
  loading.value = false;
  return data;
});

const excerpt = (overview: string) => {
  return overview.split('.')[0];
};

useHead({
  title: 'The Blogroject',
});
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul class="firehose">
        <li v-for="blog in blogs">
          <h2>
            <NuxtLink :to="blog._path">{{ blog.title }}</NuxtLink>
          </h2>
          <p>{{ blog.description }}</p>
        </li>
        <BlueSky />

        <li v-if="loading">Loading...</li>
        <li v-if="error && !loading">No books found.</li>
        <li v-if="data && !error" class="corner-icon hardcover">
          <h2>@adam4ever</h2>
          <div class="box">
            <img
              :src="data.data.me[0].user_books[0].book.cached_image.url"
              :alt="data.data.me[0].user_books[0].book.title"
            />
            <p>{{ data.data.me[0].user_books[0].book.title }}</p>
            <p>
              {{
                data.data.me[0].user_books[0].book.cached_contributors[0].author
                  .name
              }}
            </p>
          </div>
          <pre style="display: none"> {{ data.data }} </pre>
        </li>
        <li v-if="movies && !movieError" class="corner-icon tmdb">
          <h2>Liked movie</h2>
          <p>{{ movies.results[0].original_title }}</p>
          <p>{{ excerpt(movies.results[0].overview) }}.</p>
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
          <pre style="display: none">{{ movies }}</pre>
        </li>
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
    padding: 1rem;
    background-color: #fff;
    box-shadow: 4px 4px rgba(0, 0, 0, 1);
    border: 2px solid var(--slate-600);
  }

  p {
    margin-top: 1rem;
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
}
</style>
