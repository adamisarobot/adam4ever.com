<script setup lang="ts"></script>

<template>
  <div class="github">
    <a
      title="Github - adamisarobot"
      href="https://github.com/adamisarobot/adam4ever.com"
    >
      <NuxtImg
        class="github-logo"
        src="/img/github.svg"
        alt="Github - adamisarobot"
      />
    </a>
  </div>
</template>

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
