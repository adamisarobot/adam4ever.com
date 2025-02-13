<template>
  <header>
    <div class="github">
      <a href="https://github.com/adamisarobot/adam4ever.com">
        <NuxtImg class="github-logo" src="/img/github.svg" />
      </a>
    </div>

    <ThemeSwitch />

    <h1 class="hero">
      <NuxtLink to="/">Adam4ever</NuxtLink>
    </h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  a {
    color: var(--slate-950);

    &:hover,
    &:focus {
      color: var(--slate-950);
      text-decoration: none;

      [data-theme='dark'] & {
        color: var(--slate-200);
      }
    }
  }
}

.github {
  float: right;
  width: 2rem;
  height: 2rem;
}
.github-logo {
  [data-theme='dark'] & {
    filter: invert(1);
  }
}
</style>
