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
          <article class="card h-entry h-card">
            <h1 class="p-name">{{ blog.title }}</h1>
            <p class="p-summary">{{ blog.description }}</p>

            <ContentRenderer class="e-content" :value="blog" />

            <div class="return">
              <NuxtLink to="/">
                <BackArrowIcon class="arrow" />
                <span>Back</span>
              </NuxtLink>
            </div>

            <div class="made-by">
              <link
                class="u-syndication"
                :href="`https://adam4ever.com${route.path}`"
              />
              <span class="p-author">Adam Ritchie</span>
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
  display: none;
}
</style>
