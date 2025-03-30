<script lang="ts" setup>
const route = useRoute();

useHead({
  title: 'Adam4ever - the blogroject',
  meta: [
    {
      name: 'description',
      content: 'Adam4ever - the blogroject'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://adam4ever.com${route.path}`
    }
  ]
});
</script>

<template>
  <main>
    <div class="feed">
      <ContentDoc>
        <template #default="{ doc: blog }">
          <article class="post card h-entry">
            <h1 class="p-name">{{ blog.title }}</h1>
            <p class="post-summary p-summary">{{ blog.description }}</p>

            <ContentRenderer class="e-content" :value="blog" />

            <div class="return">
              <NuxtLink to="/">
                <BackArrowIcon class="arrow" />
                <span>Back</span>
              </NuxtLink>
            </div>

            <div class="made-by">
              <a
                :href="`https://adam4ever.com${route.path}`"
                class="u-url u-syndication p-author h-card"
              >
                Adam Ritchie
              </a>
              <div>
                <span
                  v-for="cat in blog.tags"
                  :key="cat"
                  class="category p-category"
                >
                  {{ cat }}
                </span>
              </div>

              <time class="dt-published" :datetime="blog.date">
                {{ blog.date }}
              </time>
            </div>
          </article>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<style scoped>
.return {
  margin-top: 1rem;
  text-align: right;

  a {
    padding: 0 0.5rem;
  }

  .arrow {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
}

.made-by {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 0.75rem;

  .category {
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0 0.25rem;
    border: 3px solid var(--highlight);
  }

  /* I styled this just in case but generally I want it only for h-entry validation */
  display: none;
}
</style>
