<script setup lang="ts">
import { filename, type Project } from '@/utils/types';
interface Props{
  portfolioItem: Project
  index: number,
  isFocused?: boolean
  path: string
}

const props = defineProps<Props>();

const currentPortfolioItem = toRef(props, 'portfolioItem');

const displayIndex = computed(() => {
  return props.index.toString().padStart(2, '0');
});

const { width, height } = useWindowSize();
const { x, y } = useMouse();
const parallaxOffset = 30;

/**
 * Determine the inline styles to apply to the element
 */
const elementStyle = computed(() => {
  return {
    'transform': `translate(${(((1 / width.value) * x.value) * parallaxOffset * -1)}px, ${(((1 / height.value) * y.value) * parallaxOffset * -1)}px)`,
  }
});

const elementClasses = computed(() => {
  return {
    'project-cover': true,
    'project-cover--focused': props.isFocused
  }
});
const glob = import.meta.glob('@/assets/images/projects/**/*.{png,jpg}', { eager: true })
const images = Object.fromEntries(Object.entries(glob).map(([key, value]) => {
  const clientName = key.split('/')?.[5]
  const fileName = filename(key)
  //@ts-ignore
  return [clientName+fileName,value.default]
}))
</script>

<template>
  <article role="article" :class="elementClasses" tabindex="0" :aria-label="currentPortfolioItem.title"
    :aria-description="currentPortfolioItem.lead">

    <!-- Title & Stack -->
    <div class=" flex justify-between items-end mb-3 flex-nowrap">
      <div class="flex flex-col md:flex-row md:items-end">
        <h2 class="lead pb-1 pe-3 inline-block mb-0 lg:ps-4 ps-0" style="color: #F2F2F2">{{ displayIndex }}.</h2>
        <div class="inline-block">
          <span class="project-cover__type text-sm mb-0 block">{{ currentPortfolioItem.type }}</span>
          <h2 class="project-cover__title mb-0">{{ currentPortfolioItem.title }}</h2>
        </div>
      </div>
      <div class="justify-end hidden lg:flex">
        <CodeLine v-if="props.isFocused" :number="'//'">
          <span :class="stackItem.color" v-for="stackItem, stackIndex in currentPortfolioItem.stack "> 
            {{stackItem.name}} <span class="px-1" v-if="stackIndex < currentPortfolioItem.stack.length - 1" > | </span>
          </span>
        </CodeLine>
      </div>
    </div>

    <!-- Cover -->
    <RouterLink :to="path + currentPortfolioItem.slug">
      <div class="project-cover__video-container" >
        <i class="fa-sharp fa-regular fa-arrow-up-right fa-3x open-arrow" ></i>
        <img class="project-cover__video mouse-md" :style="elementStyle" :src="images[currentPortfolioItem.cover]" alt="" ref="projectCover">
        <!-- <p>{{ images['zaga/cover'] }}</p> -->
      </div>
    </RouterLink>

    <!-- Lead Text (Mobile)  -->
    <h3 class="project-cover__lead block lg:hidden mt-4">
      {{ currentPortfolioItem['lead'] }}
    </h3>

  </article>
</template>

<style lang="scss" scoped>
.project-cover {
  position: relative;
  width: 1040px;
  aspect-ratio: 2;
  flex: none;
  transform: scale(0.6);
  transform-origin: bottom center;
  transition: scale 0.6s cubic-bezier(0.6, 0, 0.2, 1);

  @media screen and (max-width: 1680px) {
    width: 960px;
  }

  @media screen and (max-width: 1400px) {
    width: 800px;
  }

  @media screen and (max-width: 1200px) {
    width: 700px;
  }

  @media screen and (max-width: 992px) {
    width: calc(100vw - 60px);
    transform: scale(0.8);
  }
}

.project-cover__type {
  color: #AFBFD6;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.tech-stack {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.project-cover__title {
  color: #F2F2F2;
}

.project-cover__video-container {
  width: 100%;
  height: calc(100vh - 380px);
  box-shadow: rgba(0, 0, 0, 0.3) 0 40px 10px -20px;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 992px) {
    height: calc(100vh - 440px);
  }
}

.project-cover__video {
  width: calc(100% + 60px);
  height: calc(100% + 60px);
  object-fit: cover;
  object-position: center top;
  transform-origin: center center;
}

.project-cover--focused {
  transition: transform 0.4s cubic-bezier(0.6, 0, 0.2, 1);
  transform: scale(1);
  
  .project-cover__type,
  .project-cover__lead {
    opacity: 1;
    transition-delay: 0.2s;
  }
  .project-cover__video{
    animation: 30s linear 1s infinite alternate backdrop-scroll;
  }

  .tech-stack {
    opacity: 1;
  }

  &:hover {

    .open-arrow {
      opacity: 1;
    }
  }
}

.project-cover__lead {
  color: #F2F2F2;
  font-size: 1.0rem;
  max-width: 500px;
  opacity: 0;
  transition: opacity 1s ease;
  font-weight: 500;
  font-family: "Inter", sans-serif;
}

.open-arrow {
  color: #F2F2F2;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  z-index: 2;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  transition: opacity 0.1s ease;
  pointer-events: none;

  @media screen and (max-width: 992px) {
    opacity: 1;
  }
}
@keyframes backdrop-scroll {
  from{
    object-position: center top;
  }
  to{
    object-position: center bottom;
  }
}
</style>
