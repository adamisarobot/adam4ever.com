<template>
  <header>
    <div class="github">
      <a href="https://github.com/adamisarobot/adam4ever.com">
        <NuxtImg class="github-logo" src="/img/github.svg" />
      </a>
    </div>

    <ThemeSwitch />

    <h1 class="hero">
      <span>Adam4ever</span>
    </h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
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
