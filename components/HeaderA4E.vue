<template>
  <header>
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

    <ThemeSwitch />

    <h1 class="hero">
      <NuxtLink to="/">Adam4ever</NuxtLink>
    </h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 10vw, 18rem);
  text-align: center;

  a {
    color: var(--slate-950);
    border: 0;

    [data-theme='dark'] & {
      color: var(--slate-50);
    }

    &:hover,
    &:focus {
      color: var(--slate-950);
      text-decoration: none;
      background-position-y: 0%;

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
