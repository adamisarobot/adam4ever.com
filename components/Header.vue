<template>
  <header>
    <nuxt-link class="logo" to="/">
      <img src="/img/adam4ever.svg" alt="Adam4ever - the blogroject" />
    </nuxt-link>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/feed">Feed</nuxt-link>
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
  padding: 0.5rem 1rem;
  border-bottom: 3px solid var(--slate-950);
}
nav {
  font-size: 1rem;
  ul {
    display: flex;
    gap: 1rem;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: underline;
    text-underline-position: under;
    text-decoration-color: var(--slate-950);
    text-decoration-thickness: 2px;
    color: var(--slate-500);
    &:hover {
      color: var(--slate-950);
    }
  }
  a.active {
    color: #000;
  }
}
.logo {
  width: 3rem;
  padding: 0.25rem;

  svg {
    width: 100%;
  }
}
</style>
