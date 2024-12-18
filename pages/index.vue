<script lang="ts" setup>
const loading = ref(true);

const { data: blogs } = await useAsyncData('blog', () =>
  queryContent('/blog').find()
);

const { data, error } = await useAsyncData<BooksData>('books', () =>
  $fetch('/api/fetch-hardcover')
).then((data) => {
  loading.value = false;
  return data;
});

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
        <li v-if="data" class="corner-icon hardcover">
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
}
</style>
