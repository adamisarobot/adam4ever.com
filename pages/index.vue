<script lang="ts" setup>
import type { FirehoseData } from '~/types/firehose';

const { data: firehose, error } = await useAsyncData<FirehoseData>(
  'firehose',
  () => $fetch<FirehoseData>('/api/fetch-firehose')
);

const posts = computed(() =>
  Array.isArray(firehose.value) ? firehose.value : []
);

useHead({
  title: 'The Blogroject'
});
</script>

<template>
  <main>
    <section id="feed" class="feed">
      <ul v-if="!error && posts.length > 0" class="firehose">
        <FeedCard
          v-for="post in posts"
          :key="`${post.meta.source}:${post.id}`"
          :post="post"
        />
      </ul>
      <div
        v-else-if="firehose && !Array.isArray(firehose) && 'error' in firehose"
        class="error-state"
      >
        <p>{{ firehose.error }}</p>
        <pre v-if="firehose.message">{{ firehose.message }}</pre>
      </div>
    </section>
  </main>
</template>
