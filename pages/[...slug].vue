<script lang="ts" setup>
const path = useRoute().fullPath;

useHead({
  title: "Adam4ever - the blogroject",
  meta: [
    {
      name: "description",
      content: "Adam4ever - the blogroject"
    }
  ],
  link: [
    {
      rel: "canonical",
      href: `https://adam4ever.com${path}`
    }
  ]
});
</script>

<template>
  <main class="wide">
    <div class="feed">
      <ContentDoc>
        <template #default="{ doc }">
          <ContentRenderer class="card" :value="doc" />
          <div class="return">
            <NuxtLink to="/">
              <svg
                class="arrow"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 166.35 166.35"
                xml:space="preserve"
              >
                <g>
                  <g fill="currentColor">
                    <path
                      d="M85.168,166.35L2.002,83.172L85.168,0v48.606l79.18,0.006v69.132l-79.18,0.012V166.35z     M10.439,83.172l68.756,68.768v-40.157l79.18-0.012V54.573l-79.18-0.012V14.404L10.439,83.172z"
                    />
                  </g>
                </g>
              </svg>
              <span>Back</span>
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<style scoped>
.wide {
  grid-template-columns: 1fr 800px 1fr;
}

.return {
  margin-top: 1rem;
  text-align: right;

  .arrow {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  a {
    display: inline-block;

    &:visited {
      color: var(--slate-900);
    }

    [data-theme="dark"] & {
      color: var(--slate-100);
    }
  }
}
</style>
