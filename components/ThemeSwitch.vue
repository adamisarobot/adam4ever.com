<template>
  <!-- https://web.dev/articles/building/a-theme-switch-component -->
  <button
    @click="toggleTheme"
    class="theme-toggle"
    id="theme-toggle"
    title="Toggles light & dark"
    aria-label="auto"
    aria-live="polite"
  >
    <svg
      class="sun-and-moon"
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <circle
        class="sun"
        cx="12"
        cy="12"
        r="6"
        mask="url(#moon-mask)"
        fill="currentColor"
      />
      <g class="sun-beams" stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
      <mask class="moon" id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="10" r="6" fill="black" />
      </mask>
    </svg>
    <svg
      class="beta-icon"
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 123.8 272.4"
    >
      <path
        fill="currentColor"
        d="M37.80 261.80L16.60 261.80L16.60 108Q16.60 91.20 22.70 80.80Q28.80 70.40 39.30 65.60Q49.80 60.80 63.20 60.80L63.20 60.80Q83.80 60.80 95.20 70.60Q106.60 80.40 106.60 99L106.60 99Q106.60 113.40 98.60 121.90Q90.60 130.40 78.60 132.60L78.60 132.60L78.60 133.40Q94 135.40 103.70 145Q113.40 154.60 113.40 172.80L113.40 172.80Q113.40 186.60 107.20 196.20Q101 205.80 90.50 210.80Q80 215.80 67 215.80L67 215.80Q56.60 215.80 50.40 214Q44.20 212.20 37.80 209.20L37.80 209.20L37.80 261.80ZM64.20 198.60L64.20 198.60Q77 198.60 84.40 191.40Q91.80 184.20 91.80 171.20L91.80 171.20Q91.80 161.20 88 154.80Q84.20 148.40 78 145.30Q71.80 142.20 64.80 142.20L64.80 142.20L50.40 142.20L50.40 126L62.80 126Q73.20 126 79.10 119Q85 112 85 100.60L85 100.60Q85 89.20 78.50 83.60Q72 78 62.80 78L62.80 78Q56.20 78 50.50 80.60Q44.80 83.20 41.30 89.90Q37.80 96.60 37.80 108.60L37.80 108.60L37.80 190.80Q44.20 194.40 50.10 196.50Q56 198.60 64.20 198.60Z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  const modes = ['light', 'dark', 'beta'];
  const currentIndex = modes.indexOf(colorMode.preference);
  const nextIndex = (currentIndex + 1) % modes.length;
  colorMode.preference = modes[nextIndex];
};
</script>

<style scoped>
@import 'https://unpkg.com/open-props/easings.min.css';

.theme-toggle {
  --size: 2rem;
  --icon-fill: hsl(210 10% 30%);
  --icon-fill-hover: hsl(210 10% 15%);

  background: none;
  border: none;
  padding: 0;

  inline-size: var(--size);
  block-size: var(--size);
  aspect-ratio: 1;
  border-radius: 50%;

  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  outline-offset: 5px;

  & > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
  }

  [data-theme='dark'] & {
    --icon-fill: hsl(210 10% 70%);
    --icon-fill-hover: hsl(210 15% 90%);
  }

  [data-theme='beta'] & {
    --icon-fill: hsl(280 60% 60%);
    --icon-fill-hover: hsl(280 70% 80%);
  }

  @media (hover: none) {
    --size: 48px;
  }
}

.beta-icon {
  display: none;
}

.sun-and-moon {
  & > .moon,
  & > .sun,
  & > .sun-beams {
    transform-origin: center center;
  }

  & > .moon,
  & > .sun {
    fill: var(--icon-fill);

    .theme-toggle:is(:hover, :focus-visible) & {
      fill: var(--icon-fill-hover);
    }
  }

  & > .sun-beams {
    stroke: var(--icon-fill);
    stroke-width: 2px;

    .theme-toggle:is(:hover, :focus-visible) & {
      stroke: var(--icon-fill-hover);
    }
  }

  [data-theme='dark'] & {
    & > .sun {
      transform: scale(1.75);
    }

    & > .sun-beams {
      opacity: 0;
    }

    & > .moon > circle {
      transform: translateX(-7px);

      @supports (cx: 1px) {
        transform: translateX(0);
        cx: 17px;
      }
    }
  }

  [data-theme='beta'] & {
    & .sun-and-moon {
      display: none;
    }

    & .beta-icon {
      display: block;
      color: var(--icon-fill);

      &:hover {
        color: var(--icon-fill-hover);
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    & > .sun {
      transition: transform 0.5s var(--ease-elastic-3);
    }

    & > .sun-beams {
      transition: transform 0.5s var(--ease-elastic-4),
        opacity 0.5s var(--ease-3);
    }

    & .moon > circle {
      transition: transform 0.25s var(--ease-out-5);

      @supports (cx: 1px) {
        transition: cx 0.25s var(--ease-out-5);
      }
    }

    [data-theme='dark'] & {
      & > .sun {
        transform: scale(1.75);
        transition-timing-function: var(--ease-3);
        transition-duration: 0.25s;
      }

      & > .sun-beams {
        transform: rotateZ(-25deg);
        transition-duration: 0.15s;
      }

      & > .moon > circle {
        transition-delay: 0.25s;
        transition-duration: 0.5s;
      }
    }
  }
}
</style>
