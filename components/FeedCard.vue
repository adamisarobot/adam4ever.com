<script setup lang="ts">
import BlogCard from './BlogCard.vue';
import BlueSky from './BlueSky.vue';
import TMDBWatchlist from './TMDBWatchlist.vue';
import HardCover from './HardCover.vue';
import type { Post } from '~/types/firehose';
import { getFeedCard } from '~/utils/feed-card';

const props = defineProps<{ post: Post }>();

const components = {
  blog: BlogCard,
  bluesky: BlueSky,
  tmdb: TMDBWatchlist,
  hardcover: HardCover
};

const card = computed(() => getFeedCard(props.post));
</script>

<template>
  <component :is="components[card.source]" v-if="card" v-bind="card.props" />
</template>
