<script setup lang="ts"></script>

<template>
  <div>
    <input id="menu-open" type="checkbox" class="menu-open" />
    <label for="menu-open" class="menu-open-button">
      <span class="lines line-1"></span>
      <span class="lines line-2"></span>
      <span class="lines line-3"></span>
    </label>
  </div>
</template>

<style>
/* -- Menu Button --*/
.lines {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  margin-left: -12.5px;
  margin-top: -1.5px;
  width: 25px;
  height: 3px;
  background: var(--slate-950);
  transition: transform 200ms;
}

.line-1 {
  transform: translate3d(0, -8px, 0);
}

.line-2 {
  transform: translate3d(0, 0, 0);
}

.line-3 {
  transform: translate3d(0, 8px, 0);
}

.menu-open:checked + .menu-open-button .line-1 {
  transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-open:checked + .menu-open-button .line-2 {
  transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-open:checked + .menu-open-button .line-3 {
  transform: translate3d(0, 0, 0) rotate(-45deg);
}
</style>
