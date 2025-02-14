<template>
  <aside class="aside">
    <div v-if="$slots.label" class="aside__label">
      <slot name="label">Aside</slot>
    </div>
    <div class="aside__content">
      <slot>
        <p>This is placeholder text.</p>
      </slot>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.aside {
  display: flex;
  align-items: center;
  margin: 1rem 0 2rem;
  font-size: 1rem;
  border: 4px solid #000;
  border-right: 0;
  border-left: 0;
  background-color: var(--slate-200);
  box-shadow: -0.4rem 0.4rem 0 0 var(--highlight);

  @media screen and (min-width: 53em) {
    margin-left: -2.5rem;
    margin-right: -2.5rem;
  }

  [data-theme='dark'] & {
    border-color: #fff;
    background-color: var(--slate-800);
  }
}

.aside__label {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  padding: 0.1rem 0.3rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  color: #fff;
  background-color: #000;
  user-select: none;

  [data-theme='dark'] & {
    color: #000;
    background-color: #fff;
  }
}

.aside__content {
  padding: 1rem 1.5rem 0;
}
</style>

<style>
.aside__label p {
  margin: 0;
}
</style>
