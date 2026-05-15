<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  word: string;
}>();

const { data, pending, error } = await useFetch('/api/dictionary', {
  query: { word: props.word },
  key: `dictionary-${props.word}` // Avoid sharing cache incorrectly
});

const entry = computed(() => {
  if (data.value && data.value.data && data.value.data.length > 0) {
    return data.value.data[0];
  }
  return null;
});

const audioData = computed(() => data.value?.audio_data);

const playAudio = () => {
  if (audioData.value) {
    const audio = new Audio(audioData.value);
    audio.play();
  }
};

const definitions = computed(() => {
  if (!entry.value) return [];
  const defs = [];
  for (const meaning of entry.value.meanings) {
    for (const def of meaning.definitions) {
      defs.push({
        partOfSpeech: meaning.partOfSpeech,
        definition: def.definition
      });
      if (defs.length >= 3) return defs;
    }
  }
  return defs;
});

const phoneticText = computed(() => {
  if (!entry.value) return '';
  return entry.value.phonetic || entry.value.phonetics?.find((p: any) => p.text)?.text || '';
});
</script>

<template>
  <ul class="firehose">
    <li class="card" v-if="!error">
      <div class="card-content">
        <h2>{{ props.word }}</h2>

        <p class="phonetic" v-if="phoneticText || audioData">
          <span v-if="phoneticText">{{ phoneticText }}</span>
          <button v-if="audioData" @click="playAudio" class="play-btn" aria-label="Play pronunciation"
            title="Play pronunciation">
            <Icon name="mi:play" />
          </button>
        </p>

        <div v-if="pending" class="description">
          <p>Loading definition...</p>
        </div>
        <div v-else-if="definitions.length > 0" class="description">
          <ul>
            <li v-for="(def, index) in definitions" :key="index">
              <em>{{ def.partOfSpeech }}</em>: {{ def.definition }}
            </li>
          </ul>
        </div>
        <div v-else class="description">
          <p>No definition found.</p>
        </div>

        <div class="card-badges">
          <Badge>TIL Word</Badge>
        </div>
      </div>
      <div class="card-meta" v-if="data?.created_at">
        <span class="timestamp">
          <NuxtTime :datetime="data.created_at" />
        </span>
      </div>
    </li>
    <li class="card corner-icon dictionary error" v-else>
      <div class="card-content">
        <h2>{{ props.word }}</h2>
        <p class="description">Failed to load definition.</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.card {
  list-style: none;
}

.phonetic {
  display: flex;
  align-items: center;
  font-style: italic;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.play-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.6;
  margin-left: 8px;
  transition: opacity 0.2s ease, transform 0.1s ease;
  padding: 4px;
  border-radius: 50%;
}

.play-btn:hover {
  opacity: 1;
  background-color: rgba(128, 128, 128, 0.1);
  transform: scale(1.1);
}

.play-btn svg {
  width: 18px;
  height: 18px;
}

.description ul {
  padding-left: 1.2rem;
  margin: 0;
}

.description li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
</style>
