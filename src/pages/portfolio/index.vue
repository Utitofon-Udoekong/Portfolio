

<script setup lang="ts">

import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";

const portfolioData = usePortfolio();
const selected = ref(0);
const router = useRouter()
const portfolioScrollPercentage = computed(() => 0);

useHead({
  title: 'Explore Portfolio | Utitofon Udoekong',
  meta: [
    {
      name: 'description',
      content: 'Senior front end engineer with 4+ years building creative websites, interactive experiences and custom web software.'
    }
  ]
});

const {width} = useWindowSize();
const portfolioItemWidth = computed(() => {
  if (width.value > 1680) {
    return 1040;
  }
  if (width.value > 1400) {
    return 960;
  }
  if (width.value > 1200) {
    return 800;
  }
  if (width.value > 992) {
    return 700;
  }
  return width.value - 60;
});

/**
 * Update the selected project, called by wheel and key events
 * @param selectedIndex
 */
const updateSelected = (selectedIndex: number) => {
  selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
  selectedIndex = selectedIndex > portfolioData.length - 1 ? portfolioData.length - 1 : selectedIndex;
  selected.value = selectedIndex;
  gsap.killTweensOf("#portfolio-feed");
  gsap.to("#portfolio-feed", {
    x: portfolioItemWidth.value * selected.value * -1,
    duration: 0.5,
    ease: "power3.out"
  });
  gsap.killTweensOf(portfolioScrollPercentage);
  gsap.to(portfolioScrollPercentage, {
    value: selected.value * (1 / portfolioData.length),
    duration: 0.5,
    ease: "power1.out"
  });
}

/**
 * Updates the selected project, called by drag and touch events
 * @param event
 */
const updateDragSelected = function (event: any) {
  //@ts-ignore
  let selectedIndex = Math.floor(Math.abs((this.endX) / portfolioItemWidth.value));
  selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
  selectedIndex = selectedIndex > portfolioData.length - 1 ? portfolioData.length - 1 : selectedIndex;
  selected.value = selectedIndex;
  gsap.killTweensOf(portfolioScrollPercentage);
  gsap.to(portfolioScrollPercentage, {
    value: selected.value * (1 / portfolioData.length),
    duration: 2,
    ease: "power1.out"
  });
}

let draggable: any = null;

/**
 * Handle wheel events as portfolio scrolling, but push back against touchpads
 * @param event
 */
const wheelHandler = (event: any) => {
  const isTouchPad = event["wheelDeltaY"] ? event["wheelDeltaY"] === -3 * event.deltaY : event.deltaMode === 0;
  if (!isTouchPad) {
    let newSelected = selected.value;
    if (event.deltaY > 0) {
      newSelected += 1
    } else {
      newSelected -= 1
    }
    updateSelected(newSelected);
  }
}

const paginateNext = () => {
  let newSelected = selected.value + 1;
  updateSelected(newSelected);
}

const paginatePrev = () => {
  let newSelected = selected.value - 1;
  updateSelected(newSelected);
}

onMounted(() => {

  gsap.registerPlugin(Draggable);

  // Wheel Events
  useEventListener(document, 'wheel', wheelHandler);

  // Keyboard Events
  useEventListener(document, 'keyup', (event) => {
    let newSelected = selected.value;
    if (event.key === 'ArrowRight') {
      newSelected += 1
      updateSelected(newSelected);
      return;
    }
    if (event.key === 'ArrowLeft') {
      newSelected -= 1
      updateSelected(newSelected);
      return;
    }
    if (event.key === 'Enter') {
      return router.push('/portfolio/' + portfolioData[selected.value]["slug"]);
    }
  });

  setupDraggable();

});
onActivated(() => {
  setupDraggable();
});
onUnmounted(() => {
  if (draggable) {
    draggable[0].kill();
  }
});

function setupDraggable() {
  if (draggable) {
    return;
  }
  nextTick(() => {
    const offsets = [];
    for (let i = 0; i < portfolioData.length; i++) {
      offsets.push((i * portfolioItemWidth.value) * -1);
    }
    const container = document.querySelector("#portfolio-feed");
    if (!container) {
      setTimeout(() => {
        setupDraggable();
      }, 100);
      return;
    }
    draggable = Draggable.create(container, {
      type: "x",
      edgeResistance: 1,
      snap: offsets,
      inertia: true,
      bounds: {
        minX: 0,
        maxX: portfolioItemWidth.value * (portfolioData.length - 1) * -1
      },
      //onDrag: updateDragSelected,
      onDragEnd: updateDragSelected,
      //allowNativeTouchScrolling: false,
      zIndexBoost: false
    });
  });
}

</script>

<template>
  <section class="absolute inset-0 px-0 py-8 md:p-16">

    <NavMenu/>

    <div class="container-xxxl pt-4 lg:pt-6">
      <div class="flex justify-between">
        <div class="flex flex-row items-center px-8 md:px-16">

          <!-- Back to Home -->
          <RouterLink class="back-link mouse-md" to="/"><i class="fa-sharp fa-solid fa-arrow-up-left fa-2x pe-3"></i>Home
          </RouterLink>

          <div class="hidden lg:block ms-6">
            <PortfolioScrubber class="flex" :portfolioData="portfolioData" :selected="selected"
                             @updateSelected="updateSelected"/>
          </div>

        </div>
        <div class="relative hidden md:block">
          <!-- Pagination Controls -->
          <div class="pagination pe-5 lg:pe-6 lg:flex" v-if="portfolioData">
            <i class="fa-sharp fa-regular fa-arrow-left-long fa-3x pagination--prev mouse-md"
               @click.prevent="paginatePrev" :class="{'disabled': selected === 0}"></i>
            <i class="fa-sharp fa-regular fa-arrow-right-long fa-3x pagination--next mouse-md"
               @click.prevent="paginateNext" :class="{'disabled': selected === portfolioData.length - 1}"></i>
          </div>
        </div>
      </div>
    </div>

    <div id="portfolio-feed-container" class="mt-5 lg:mt-6 px-0" style="overflow: hidden;">
      <div id="portfolio-feed" class="feed-section" role="feed" aria-busy="false" aria-label="Case Studies"
           v-if="portfolioData">

        <div class="feed-section__container-padding"/>

        <ProjectCover path="/portfolio/" :aria-posinset="index" :aria-setsize="portfolioData.length" :portfolioItem="portfolioItem"
                      :index="index"
                      v-for="(portfolioItem, index) in portfolioData" :isFocused="index === selected"/>

        <div class="feed-section__extraElement"/>

        <div class="feed-section__container-padding"/>
      </div>
    </div>


    <div id="bottom-bar" class="container-xxxl px-8 md:px-16">
      <BottomBar/>
    </div>

    <div class="block lg:hidden">
      <PortfolioScrubber class="portfolio-links--mobile flex" :portfolioData="portfolioData"
                       :selected="selected" @updateSelected="updateSelected"/>
    </div>

  </section>
</template>

<style lang="scss" scoped>

* {
  user-select: none;
  -webkit-user-select: none;
}

h1 {
  color: #F2F2F2;
  text-shadow: -1px -1px 0px rgb(54, 201, 227), 1px 1px 0px rgb(255, 0, 106), 0px 4px 10px rgb(0 0 0 / 50%);
  letter-spacing: 2px;
}

.feed-section {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  gap: 0;
  flex-wrap: nowrap;
  width: fit-content;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 60px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.page-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: translateX(10%);
}

.feed-section__extraElement {
  width: 1040px;
  height: 10px;
  display: block;
  flex: none;

  @media screen and (max-width: 1680px) {
    width: 960px;
  }

  @media screen and (max-width: 1400px) {
    width: 800px;
  }

  @media screen and (max-width: 1200px) {
    width: 700px;
  }

}

.pagination {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  top: 180px;
  right: 0;
  z-index: 50;
  gap: 60px;

  i {
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;

    &.disabled {
      opacity: 0.2;
      pointer-events: none;
    }

    &.pagination--prev {

      &:hover {
        transform: translateX(-5px);
      }
    }

    &.pagination--next {

      &:hover {
        transform: translateX(5px);
      }
    }
  }
}

</style>
