<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '~/types/firehose';

const props = defineProps<{
  movie: Movie;
}>();

// Calculate percentage for the user score circle
const scorePercentage = computed(() => {
  return Math.round(props.movie.vote_average * 10);
});

// SVG Circle math
const radius = 20;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = computed(() => {
  return circumference - (scorePercentage.value / 100) * circumference;
});

const scoreColor = computed(() => {
  if (scorePercentage.value >= 70) return '#21d07a';
  if (scorePercentage.value >= 40) return '#d2d531';
  return '#db2360';
});
</script>

<template>
  <div class="tmdb-card">
    <div 
      class="tmdb-card-bg" 
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})` }"
    ></div>
    
    <div class="tmdb-card-content">
      <div class="tmdb-poster-wrapper">
        <NuxtImg 
          class="tmdb-poster" 
          :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" 
          :alt="movie.title"
          loading="lazy"
        />
      </div>
      
      <div class="tmdb-info">
        <h2 class="tmdb-title">
          {{ movie.title }} 
          <span class="tmdb-year" v-if="movie.release_date">
            ({{ movie.release_date.split('-')[0] }})
          </span>
        </h2>
        
        <div class="tmdb-actions">
          <div class="tmdb-score-wrapper">
            <div class="tmdb-score">
              <svg width="50" height="50" class="score-svg">
                <circle 
                  class="score-bg" 
                  cx="25" cy="25" r="20" 
                  stroke-width="4" 
                />
                <circle 
                  class="score-progress" 
                  cx="25" cy="25" r="20" 
                  stroke-width="4" 
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  :stroke="scoreColor"
                />
              </svg>
              <div class="score-text">
                {{ scorePercentage }}<span class="percent">%</span>
              </div>
            </div>
            <div class="score-label">
              User<br>Score
            </div>
          </div>
          
          <div class="tmdb-icon-btn">
            <Icon name="ph:list-bold" />
          </div>
          <div class="tmdb-icon-btn">
            <Icon name="ph:heart-fill" />
          </div>
          <div class="tmdb-icon-btn">
            <Icon name="ph:bookmark-simple-fill" />
          </div>
        </div>

        <div v-if="movie.tagline" class="tmdb-tagline">
          {{ movie.tagline }}
        </div>

        <div class="tmdb-overview">
          <h3>Overview</h3>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tmdb-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #0d253f; /* TMDB Dark Blue fallback */
  color: #fff;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
}

.tmdb-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.tmdb-card-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(13, 37, 63, 1) 150px, rgba(13, 37, 63, 0.84) 100%);
}

.tmdb-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 30px;
}

.tmdb-poster-wrapper {
  flex-shrink: 0;
}

.tmdb-poster {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: block;
}

.tmdb-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tmdb-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.1;
}

.tmdb-year {
  font-weight: 400;
  opacity: 0.8;
}

.tmdb-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.tmdb-score-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tmdb-score {
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #081c22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px; /* padding for the SVG to fit inside */
  box-sizing: content-box;
}

.score-svg {
  position: absolute;
  top: 4px;
  left: 4px;
  transform: rotate(-90deg);
}

.score-bg {
  fill: transparent;
  stroke: #204529; /* Dark green fallback */
}

.score-progress {
  fill: transparent;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
}

.score-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  display: flex;
  align-items: flex-start;
}

.score-text .percent {
  font-size: 0.5rem;
  margin-top: 2px;
}

.score-label {
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.1;
}

.tmdb-icon-btn {
  width: 46px;
  height: 46px;
  background-color: #032541;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}

.tmdb-icon-btn:hover {
  transform: scale(1.1);
}

.tmdb-tagline {
  font-style: italic;
  font-size: 1.1rem;
  opacity: 0.7;
  margin-bottom: 10px;
  font-weight: 400;
}

.tmdb-overview h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.tmdb-overview p {
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tmdb-card-content {
    flex-direction: column;
    padding: 20px;
    align-items: center;
    text-align: center;
  }
  
  .tmdb-card-bg::after {
    background: linear-gradient(to bottom, rgba(13, 37, 63, 1) 150px, rgba(13, 37, 63, 0.84) 100%);
  }

  .tmdb-poster {
    width: 200px;
  }
  
  .tmdb-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .tmdb-score-wrapper {
    width: 100%;
    justify-content: center;
  }
}
</style>
