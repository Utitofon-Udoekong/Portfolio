<script setup lang="ts">
import { filename, type Project } from '@/utils/types';
interface Props{
  portfolioItem: Project
  index: number,
  isFocused?: boolean
}

const props = defineProps<Props>();

const currentPortfolioItem = toRef(props, 'portfolioItem');

const displayIndex = computed(() => {
  return props.index.toString().padStart(2, '0');
});

const container = ref(null);
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
    <!-- Cover -->
    <div class="project-cover__video-container" >
      <img class="project-cover__video mouse-md" :src="images[currentPortfolioItem.images[index]]" alt="">
    </div>
  </article>
</template>

<style lang="scss" scoped>
.project-cover {
  position: relative;
  width: 500px;
  aspect-ratio: 2;
  flex: none;
  transform: scale(0.6);
  transform-origin: bottom center;
  transition: scale 0.6s cubic-bezier(0.6, 0, 0.2, 1);
  @media screen and (max-width: 768px) {
    width: calc(100vw - 60px);
    transform: scale(0.8);
  }
}

.project-cover__type {
  color: #AFBFD6;
  opacity: 0;
  transition: opacity 0.6s ease;
}


.project-cover__video-container {
  width: 100%;
  height: calc(100vh - 380px);
  box-shadow: rgba(0, 0, 0, 0.3) 0 40px 10px -20px;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.project-cover__video {
  width: calc(100% + 60px);
  height: calc(100% + 60px);
  object-fit: cover;
  object-position: center top;
  transform-origin: center bottom;
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
    animation: 10s linear 1s infinite alternate backdrop-scroll;
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
