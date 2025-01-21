<script lang="ts" setup>
// No you're a ...slug
const path = useRoute().fullPath;

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
      href: `https://adam4ever.com${path}`
    }
  ]
});
</script>

<template>
  <main class="wide">
    <div class="feed">
      <ContentDoc>
        <template #default="{ doc }">
          <ContentRenderer class="card" :value="doc" />

          <div class="return">
            <NuxtLink class="slide-left" to="/">
              <LeftArrow />
              <span>Back</span>
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<style scoped>
.wide {
  grid-template-columns: 1fr 800px 1fr;
}

.return {
  margin-top: 1rem;
  text-align: right;

  .arrow {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  a {
    display: inline-block;

    &:visited {
      color: var(--slate-900);
    }

    [data-theme='dark'] & {
      color: var(--slate-100);
    }
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
