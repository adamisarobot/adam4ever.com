<template>
  <header>
    <img class="logo" alt="Adam4ever" src="/img/adam4ever.svg" />
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  border-bottom: 4px solid #333;
}
img.logo {
  max-width: 3rem;
  padding: 0.25rem;
}
nav {
  ul {
    display: flex;
    gap: 1rem;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  a.active {
    color: #000;
  }
}
</style>
