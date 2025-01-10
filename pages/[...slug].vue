<script lang="ts" setup>
const path = useRoute().fullPath;
useHead({
  title: 'Adam4ever - the blogroject',
  meta: [
    {
      name: 'description',
      content: 'Adam4ever - the blogroject',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://adam4ever.com${path}`,
    },
  ],
});
</script>

<template>
  <main class="wide">
    <div class="feed">
      <ContentDoc>
        <template v-slot="{ doc }">
          <ContentRenderer class="card" :value="doc" />
          <div class="return">
            <NuxtLink to="/">Back</NuxtLink>
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

  a {
    display: inline-block;
    background-image: url('/img/left-arrow.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    padding-left: 2rem;
    background-position: center left;

    &:visited {
      color: var(--slate-900);
    }
  }
}
</style>
