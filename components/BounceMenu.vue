<script setup lang="ts"></script>

<template>
  <nav id="menu" class="menu">
    <MenuButton />

    <a href="#" class="nuxt menu-item" title="Filter Posts">
      <span class="visually-hidden">Posts</span>
    </a>

    <GithubButton class="menu-item" />

    <ThemeSwitch class="menu-item" />
  </nav>
</template>

<style scoped>
.nuxt {
  background-image: url('/img/nuxt.svg');

  &:hover,
  &:focus {
    outline-color: #00c58e;
    background-position-y: center;
  }
}

.tmdb {
  background-size: 65%;
  background-image: url('/img/tmdb.svg');

  &:hover {
    outline-color: #04b4e2;
  }
}

.hardcover {
  background-image: url('/img/hardcover.svg');

  &:hover {
    outline-color: #6366f1;
  }
}

.bluesky {
  background-size: 65%;
  background-image: url('/img/bsky.svg');

  &:hover {
    outline-color: #1185fe;
  }
}
</style>
