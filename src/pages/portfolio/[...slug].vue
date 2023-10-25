<template>
  <section class="page">

    <NavMenu/>

    <div class="container-xxxl">

      <div class="flex flex-wrap mt-5">
        <div class="col-auto">
          <Logo :size="50" />
        </div>
      </div>

      <!-- Hero-->
      <div class="flex flex-wrap mt-5 lg:mt-6">
        <div class="w-full lg:w-1/3">
          <CodeTag class="mb-2 lg:mb-3">{{ currentPortfolioItem.type }}</CodeTag>
          <h1 class="mb-3 lg:mb-10 project__name"> {{ currentPortfolioItem.title }} </h1>
          <RouterLink class="back-link mouse-md mb-5 lg:mb-0" to="/portfolio"><i class="fa-sharp fa-solid fa-arrow-up-left fa-2x pe-3"></i>Back to Explore Projects</RouterLink>
        </div>
        <div class="relative flex-grow max-w-full flex-1">
          <img :src="images[currentPortfolioItem.cover]" class="mouse-md project__cover-image" data-aos="zoom-in-down" alt="">
          <!-- <video class="mouse-md" loop="true" muted autoplay playsinline :poster="currentPortfolioItem['cover']" data-aos="zoom-in-down">
            <source :src="currentPortfolioItem['videoWebm']" type="video/webm">
            <source :src="currentPortfolioItem['videoMP4']" type="video/mp4">
          </video> -->
        </div>
      </div>

      <div class="flex flex-wrap w-full mt-5 lg:mt-8 xl:mt-7 pb-3">
        <div class="w-full lg:w-1/3 order-2 lg:order-1 pt-6 lg:pt-0">
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
            <ActionButton to="https://calendly.com/marchantweb/discovery" target="_blank" data-aos="fade-up">
              <i class="fa-sharp fa-regular fa-calendar-range fa-lg"></i>
              Book some time
            </ActionButton>
          </aside>
        </div>
        <main class="w-full lg:w-2/3 order-1 lg:order-2">
          <div class="w-full lg:w-5/6 pr-4 pl-4 xl:w-4/5">
            <CodeLine :number="'//'" class="mb-5 lg:mb-4">
              <span class="code--yellow">npm</span>
              <span class="code--green">&nbsp;run</span>
              <span class="code--white">&nbsp;case_study</span>
            </CodeLine>
            <h1 class="mb-4 lg:mb-5" data-aos="fade-up">{{ currentPortfolioItem.lead}}</h1>
          </div>
          <!-- <NotionContent :blocks="currentPortfolioItem['pageContent']"/> -->
          <p class="mt-7 xl:mt-8 text-small text-end copyright hidden lg:block">Copyright © {{new Date().getFullYear()}} Marchant Web, LLC. All rights reserved.</p>
        </main>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { filename } from '@/utils/types';


const route = useRoute();
const portfolioData = usePortfolio();

const currentPortfolioItem = computed(() => {
  //@ts-ignore
  return portfolioData[portfolioData.findIndex(project => project["slug"] === route.params["slug"])];
});

const glob = import.meta.glob('@/assets/images/projects/**/*.{png,jpg}', { eager: true })
const images = Object.fromEntries(Object.entries(glob).map(([key, value]) => {
  const clientName = key.split('/')?.[5]
  const fileName = filename(key)
  return [clientName+fileName,value.default]
}))

useHead({
  title: 'Case Study: ' + currentPortfolioItem.value['title'] + ', ' + currentPortfolioItem.value['type'] + ' | ' + 'Marchant Web',
  meta: [
    { hid: 'description', name: 'description', content:  currentPortfolioItem.value['lead'] },
    { hid: 'og:title', property: 'og:title', content: currentPortfolioItem.value['title'] },
    { hid: 'og:url', property: 'og:url', content: 'https://marchantweb.com' + route.fullPath },
    { hid: 'og:description', property: 'og:description', content: currentPortfolioItem.value['lead'] },
    { hid: 'og:image', property: 'og:image', content: currentPortfolioItem.value['cover']},

    // twitter card
    { hid: "twitter:title", name: "twitter:title", content: currentPortfolioItem.value['title'] },
    { hid: "twitter:url", name: "twitter:url", content: 'https://marchantweb.com' + route.fullPath },
    { hid: 'twitter:description', name: 'twitter:description', content: currentPortfolioItem.value['lead'] },
    { hid: "twitter:image", name: "twitter:image", content: currentPortfolioItem.value['cover']},
  ],
  link: [
    { hid: "canonical", rel: "canonical", href: 'https://marchantweb.com' + route.fullPath },
  ],
  bodyAttrs: {
    class: 'enable-scroll'
  }
});

</script>

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

</style>
