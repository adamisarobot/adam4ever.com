<script lang="ts" setup>
// This is a working example of a dynamic route
// doesnt work with the ContentDoc component
const route = useRoute();
const page = route.params.slug[0];

const { data } = await useFetch(`https://swapi.dev/api/planets/${page}/`);
</script>
<template>
  <main>
    <!-- <ContentDoc /> -->
    <h1 v-if="data">{{ data.name }}</h1>
  </main>
</template>
<style scoped>
main {
  padding: 1rem;
}
</style>
