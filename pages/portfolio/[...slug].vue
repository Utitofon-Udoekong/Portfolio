<script setup lang="ts">
import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";


const route = useRoute();
const portfolioData = usePortfolio();
const selected = ref(0);
const portfolioScrollPercentage = computed(() => 0);

const currentPortfolioItem = computed(() => {
  return portfolioData[portfolioData.findIndex(project => project["slug"] === route.params["slug"][0])];
});

const {width, height} = useWindowSize();
const portfolioItemWidth = computed(() => {
  if (width.value > 768) {
    return 500;
  }
  return width.value - 60;
});

/**
 * Update the selected project, called by wheel and key events
 * @param selectedIndex
 */
 const updateSelected = (selectedIndex: number) => {
  selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
  selectedIndex = selectedIndex > currentPortfolioItem.value.images.length - 1 ? currentPortfolioItem.value.images.length - 1 : selectedIndex;
  selected.value = selectedIndex;
  gsap.killTweensOf("#portfolio-feed");
  gsap.to("#portfolio-feed", {
    x: portfolioItemWidth.value * selected.value * -1,
    duration: 0.5,
    ease: "power3.out"
  });
  gsap.killTweensOf(portfolioScrollPercentage);
  gsap.to(portfolioScrollPercentage, {
    value: selected.value * (1 / currentPortfolioItem.value.images.length),
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

useHead({
  title: 'Case Study: ' + currentPortfolioItem.value.title + ', ' + currentPortfolioItem.value.type + ' | ' + 'Utitofon Udoekong',
  meta: [
    { hid: 'description', name: 'description', content:  currentPortfolioItem.value.lead },
    { hid: 'og:title', property: 'og:title', content: currentPortfolioItem.value.title },
    { hid: 'og:url', property: 'og:url', content: 'https://utitofon-udoekong.vercel.app' + route.fullPath },
    { hid: 'og:description', property: 'og:description', content: currentPortfolioItem.value.lead },
    { hid: 'og:image', property: 'og:image', content: currentPortfolioItem.value['cover']},

    // twitter card
    { hid: "twitter:title", name: "twitter:title", content: currentPortfolioItem.value.title },
    { hid: "twitter:url", name: "twitter:url", content: 'https://utitofon-udoekong.vercel.app' + route.fullPath },
    { hid: 'twitter:description', name: 'twitter:description', content: currentPortfolioItem.value.lead },
    { hid: "twitter:image", name: "twitter:image", content: currentPortfolioItem.value['cover']},
  ],
  link: [
    { hid: "canonical", rel: "canonical", href: 'https://utitofon-udoekong.vercel.app' + route.fullPath },
  ],
  bodyAttrs: {
    class: 'enable-scroll'
  }
});

</script>

<template>
  <section class="absolute inset-0 py-8 md:py-16">

    <NavMenu/>

    <div class="container-xxxl">

      <div class="flex flex-wrap mt-5 ">
        <div class="col-auto">
          <Logo :size="50" />
        </div>
      </div>

      <!-- Hero-->
      <div class="flex flex-wrap mt-5 lg:mt-6 ">
        <div class="w-full lg:w-1/3">
          <CodeTag class="mb-2 lg:mb-3">{{ currentPortfolioItem.type }}</CodeTag>
          <h1 class="mb-3 lg:mb-10 project__name"> {{ currentPortfolioItem.title }} </h1>
          <NuxtLink class="back-link mouse-md mb-5 lg:mb-0" to="/portfolio"><Icon name="fluent:arrow-up-left-16-filled" size="2.5rem" class="pe-3" />Back to Explore Projects</NuxtLink>
        </div>
        <div class="relative flex-grow max-w-full flex-1">
          <ImageGlob :src="currentPortfolioItem.cover" class="mouse-md project__cover-image" data-aos="zoom-in-down" alt="" />
        </div>
      </div>

      <div class="flex flex-wrap w-full mt-5 lg:mt-8 xl:mt-7 pb-3">
        <div class="w-full lg:w-1/3 order-2 lg:order-1 pt-6 lg:pt-0 px-8 md:px-16">
          <aside class="ps-0 lg:ps-6 mb-5 lg:mb-0" style="position: sticky; top: 60px">
            <h3 class="mb-5" data-aos="fade-up">Details</h3>
            <dl class="mb-5 block" data-aos="fade-up">

              <dt v-if="currentPortfolioItem.client">Client</dt>
              <dd v-if="currentPortfolioItem.client"> {{ currentPortfolioItem.client}} </dd>

              <!-- <dt class="mt-4" v-if="currentPortfolioItem['partner']">Partner</dt>
              <dd v-if="currentPortfolioItem['partner']"> {{ currentPortfolioItem['partner']}} </dd> -->

              <dt class="mt-4" v-if="currentPortfolioItem.role">Role</dt>
              <dd v-if="currentPortfolioItem.role"> {{ currentPortfolioItem.role}} </dd>

              <dt class="mt-4" v-if="currentPortfolioItem.completed">Completed</dt>
              <dd v-if="currentPortfolioItem.completed"> {{ currentPortfolioItem.completed}} </dd>

              <!-- <dt class="mt-4" v-if="currentPortfolioItem['awards']">Recognition</dt>
              <dd v-if="currentPortfolioItem['awards']" v-html="currentPortfolioItem['awards'].replace(/\n/g, '<br />')"></dd> -->

            </dl>
            <ActionButton :to="currentPortfolioItem.address" target="_blank" data-aos="fade-up">
              <Icon name="ph:globe"/>
              View Project
            </ActionButton>
          </aside>
        </div>

        <main class="w-full lg:w-2/3 order-1 lg:order-2">
          <div class="w-full lg:w-5/6 xl:w-4/5 mb-10">
            <CodeLine :number="'//'" class="mb-5 lg:mb-4">
              <span class="code--yellow">npm</span>
              <span class="code--green">&nbsp;run</span>
              <span class="code--white">&nbsp;case_study</span>
            </CodeLine>
            <h1 class="mb-4 lg:mb-5" data-aos="fade-up">{{ currentPortfolioItem.lead}}</h1>
            <p v-if="currentPortfolioItem.about">{{ currentPortfolioItem.about }}</p>
          </div>

          <!-- Image carousel -->
          <div class="flex justify-between relative">
            <div class="lg:ms-6">
              <CodeLine :number="'//'" class="mb-5 lg:mb-4">
                <span class="code--yellow">npm</span>
                <span class="code--green">&nbsp;run</span>
                <span class="code--white">&nbsp;showcase</span>
              </CodeLine>
              <PortfolioScrubber class="flex" :portfolioData="currentPortfolioItem.images" :selected="selected"
                               @updateSelected="updateSelected"/>
            </div>
            <div class="relative hidden md:block">
              <!-- Pagination Controls -->
              <div class="pagination pe-5 lg:pe-6 lg:flex" v-if="portfolioData">
                <Icon name="solar:double-alt-arrow-left-bold" class="text-4xl pagination--prev mouse-md"
              @click.prevent="paginatePrev" :class="{ 'disabled': selected === 0 }"/>
            <Icon name="solar:double-alt-arrow-right-bold" class="text-4xl pagination--next mouse-md"
            @click.prevent="paginateNext" :class="{ 'disabled': selected === portfolioData.length - 1 }"/>
              </div>
            </div>
          </div>

          <div id="portfolio-feed-container" class="mt-5 lg:mt-6 px-0" style="overflow: hidden;">
            <div id="portfolio-feed" class="feed-section" role="feed" aria-busy="false" aria-label="Case Studies"
                v-if="currentPortfolioItem.images">

              <div class="feed-section__container-padding"/>

              <ProjectItemCover :aria-posinset="index" :aria-setsize="currentPortfolioItem.images.length" :portfolioItem="currentPortfolioItem"
                            :index="index"
                            v-for="(_, index) in currentPortfolioItem.images" :isFocused="index === selected"/>

              <div class="feed-section__extraElement"/>

              <div class="feed-section__container-padding"/>
            </div>
          </div>
          <p class="mt-7 xl:mt-8 text-small text-end copyright hidden lg:block">Copyright © {{new Date().getFullYear()}} Utitofon Udoekong, LLC. All rights reserved.</p>
        </main>
      </div>

    </div>

  </section>
</template>

<style lang="scss" scoped>

h1.project__name {
  color: #F2F2F2;
}

.project__cover-image {
  width: 100%;
  aspect-ratio: 2;
  object-fit: cover;
  box-shadow: rgba(0,0,0,0.2) 0 60px 15px -40px, rgba(0,0,0,0.06) 0 4px 6px -2px;
  border-radius: 5px;
  object-position: center top;

  @media screen and (max-width: 992px) {
    box-shadow: rgba(0,0,0,0.3) 0 10px 8px -10px, rgba(0,0,0,0.06) 0 4px 6px -2px;
  }
}

p:not(.copyright) {
  width: 700px;
  max-width: 100%;
}

.copyright{
  opacity: 0.5;
  font-size: 12px;
  border-top: 1px solid #CCC;
  max-width: 500px;
  padding-top: 20px;
  padding-left: 40px;
  float: right;
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
  // padding-bottom: 60px;

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
  width: 200px;
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
  // position: absolute;
  // top: 180px;
  // right: 0;
  z-index: 50;
  gap: 60px;

  svg {
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
