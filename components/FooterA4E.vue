<template>
  <footer>
    <!-- h-card information/validation only -->
    <div class="h-card" style="display: none">
      Made by <span class="p-nickname"> Adam4ever </span>
      <a href="https://adam4ever.com" class="u-url">
        <NuxtImg
          class="u-photo"
          src="/img/adam4ever.svg"
          width="16"
          height="16"
          alt="Adam4ever"
        />
      </a>
      <div class="visually-hidden">
        <span class="p-name">Adam Ritchie</span><br />
        <span class="p-locality">Halifax</span>,
        <span class="p-region">Nova Scotia</span>
        <div class="p-country-name">Canada</div>
        <time class="dt-bday">1975-03-01</time>
        <div class="p-category">Software Developer</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem;
}

a {
  display: inline-block;
  background: none;
  border: 0;
  vertical-align: middle;
}

img {
  width: 1rem;
  height: 1rem;
}
</style>
