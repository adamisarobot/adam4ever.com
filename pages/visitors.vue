<template>
  <div class="visitors-page">
    <header class="page-header">
      <h1>Visitor Log</h1>
      <p>See who has visited adam4ever.com from around the world!</p>
    </header>

    <div v-if="pending" class="loading-state">
      Loading visitors...
    </div>
    
    <div v-else-if="error" class="error-state">
      Failed to load visitors.
    </div>
    
    <div v-else-if="!visitors?.length" class="empty-state">
      No visitors yet. Be the first one!
    </div>

    <div v-else class="visitors-grid">
      <div 
        v-for="visitor in visitors" 
        :key="visitor.id"
        class="visitor-card"
      >
        <h3>{{ visitor.name }}</h3>
        <p class="location">{{ getFlagEmoji(visitor.location) }} {{ visitor.location }}</p>
        <p class="date">{{ new Date(visitor.created_at).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Visitor Log'
})

const { data: visitors, pending, error } = useFetch('/api/visitors')

const getFlagEmoji = (locationStr) => {
  if (!locationStr) return '📍'
  const code = locationStr.split(', ').pop().toUpperCase()
  if (!/^[A-Z]{2}$/.test(code)) return '📍'
  return code.replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
}
</script>

<style scoped>
.visitors-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: inherit;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.125rem;
}

:global(html.dark) .page-header p {
  color: #aaa;
}

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.error-state {
  color: #dc3545;
  background: #f8d7da;
  border-radius: 8px;
}

.visitors-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.visitor-card {
  background: white;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

:global(html.dark) .visitor-card {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.visitor-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.location {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
}

:global(html.dark) .location {
  color: #aaa;
}

.date {
  color: #999;
  font-size: 0.75rem;
  margin: 1rem 0 0 0;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  margin-top: auto;
}

:global(html.dark) .date {
  border-color: #374151;
}
</style>
