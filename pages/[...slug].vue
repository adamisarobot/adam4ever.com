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
    <div class="feed post">
      <ContentDoc>
        <template #default="{ doc: blog }">
          <ContentRenderer class="card" :value="blog" />

          <div class="return">
            <NuxtLink to="/">
              <BackArrowIcon class="arrow" />
              <span>Back</span>
            </NuxtLink>
          </div>
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

.slide-left {
  touch-action: manipulation;
  text-decoration: none;

  svg {
    transition: transform 0.3s ease-in-out;
  }
  &:hover {
    svg {
      transform: translateX(-0.5rem);
    }
  }
}
</style>
