<template>
  <a
    ref="link"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="fetch-display-link"
    @mouseenter="startFetch"
    @focus="startFetch"
  >
    <slot>{{ text || url }}</slot>
    <span class="tool-tip" :tip-position="tipPosition">
      <span v-if="loading" class="loading">Loading preview...</span>
      <span v-else-if="error">
        <span class="error-title">{{ fallbackTitle || text || url }}</span>
        <span v-if="fallbackDescription" class="description">{{
          fallbackDescription
        }}</span>
      </span>
      <span v-else class="preview-content">
        <img
          v-if="metadata.image"
          :src="metadata.image"
          alt="Link preview"
          class="preview-image"
        />
        <span class="text-content">
          <span class="title">{{
            metadata.title || fallbackTitle || text || url
          }}</span>
          <span class="description">{{
            truncatedDescription || fallbackDescription
          }}</span>
        </span>
      </span>
    </span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  fallbackTitle: {
    type: String,
    default: ''
  },
  fallbackDescription: {
    type: String,
    default: ''
  },
  tipPosition: {
    type: String,
    default: 'top'
  }
});

const link = ref<HTMLElement | null>(null);
const loading = ref(false);
const error = ref(false);
const fetched = ref(false);
const metadata = ref({
  title: '',
  description: '',
  image: ''
});

const truncatedDescription = computed(() => {
  const desc = metadata.value.description;
  if (!desc) return '';
  return desc.length > 140 ? desc.substring(0, 140) + '...' : desc;
});

const fetchMetadata = async () => {
  if (fetched.value || loading.value) return;

  loading.value = true;
  try {
    const data = await $fetch('/api/fetch-metadata', {
      params: { url: props.url }
    });

    if (data && (data.title || data.description || data.image)) {
      metadata.value = {
        title: data.title || '',
        description: data.description || '',
        image: data.image || ''
      };
    } else {
      error.value = true;
    }
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
    fetched.value = true;
  }
};

const startFetch = () => {
  if (!fetched.value) {
    fetchMetadata();
  }
};

// Prefetch when visible
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (link.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMetadata();
          if (link.value && observer) observer.unobserve(link.value);
        }
      });
    });
    observer.observe(link.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.fetch-display-link {
  position: relative;
  display: inline-block;
  text-decoration: underline; /* Standard link style */
}

.tool-tip {
  /* Inherits from global tool-tip.css but we can override or extend here */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  max-height: 120px;
  object-fit: cover;
  display: block;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: left;
  width: 100%;
}

.title,
.error-title {
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.2;
}

.description {
  font-size: 0.75rem;
  opacity: 0.9;
  line-height: 1.3;
}

.loading {
  font-size: 0.8rem;
  font-style: italic;
}
</style>
