<template>
  <div class="visitor-widget-container">
    <button class="btn btn-primary" @click="isOpen = true">
      Sign Visitor Log
    </button>
    <NuxtLink to="/visitors" class="btn btn-secondary">
      View Visitors
    </NuxtLink>

    <!-- Modal -->
    <div v-if="isOpen" class="modal-overlay" @click.self="isOpen = false">
      <div class="modal-content">
        <button class="close-btn" @click="isOpen = false">&times;</button>
        
        <h2>Visitor Log</h2>

        <div v-if="success" class="success-message">
          <p>Thank you for signing the visitor log!</p>
          <button class="btn btn-primary w-full" @click="isOpen = false">
            Close
          </button>
        </div>

        <form v-else @submit.prevent="submitLog">
          <div class="form-group">
            <label for="name">Your First Name</label>
            <input 
              id="name"
              v-model="name"
              type="text" 
              maxlength="50"
              placeholder="e.g. John" 
              required
            />
          </div>

          <p v-if="name" class="preview-text">
            Preview: {{ name }} from (Auto-Detected Location)
          </p>

          <p v-if="error" class="error-text">{{ error }}</p>

          <button 
            type="submit" 
            :disabled="loading || !name"
            class="btn btn-primary w-full"
          >
            {{ loading ? 'Submitting...' : 'Submit Entry' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const name = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const submitLog = async () => {
  if (!name.value.trim()) return
  
  loading.value = true
  error.value = ''
  
  try {
    const res = await $fetch('/api/visitors', {
      method: 'POST',
      body: { name: name.value }
    })
    
    if (res.success) {
      success.value = true
    }
  } catch (err) {
    error.value = err.data?.statusMessage || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.visitor-widget-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  transition: opacity 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.w-full {
  width: 100%;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  color: #333;
}

:global(html.dark) .modal-content {
  background: #1f2937;
  color: white;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  color: #333;
}

:global(html.dark) .form-group input {
  background: #374151;
  color: white;
  border-color: #4b5563;
}

.preview-text {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
}

:global(html.dark) .preview-text {
  color: #aaa;
}

.error-text {
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.success-message {
  text-align: center;
  padding: 1rem 0;
}

.success-message p {
  color: #28a745;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}
</style>
