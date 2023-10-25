<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import gsap from "gsap"

const Cursor = defineAsyncComponent(() => import("@/components/Cursor.vue"))
const Hero = defineAsyncComponent(() => import("@/components/Hero.vue"))
const currentValue = ref(0)

function updateCounter() {
  if (currentValue.value == 100) return;
  currentValue.value += Math.floor(Math.random() * 10) + 1;
  if (currentValue.value > 100) {
    currentValue.value = 100
  }

  const delay = Math.floor(Math.random() * 200) + 50;
  setTimeout(updateCounter, delay)
}
onMounted(() => {
  updateCounter()
  gsap.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0
  })
  // gsap.from(".FN", 1.5, {
  //   delay: 4,
  //   y: 700,
  //   stagger: {
  //     amount: 0.5
  //   },
  //   ease: "power4.inOut"
  // })
  // gsap.from(".SN", 1.5, {
  //   delay: 5,
  //   y: 700,
  //   stagger: {
  //     amount: 0.5
  //   },
  //   ease: "power4.inOut"
  // })
  gsap.to(".bar", 1.5, {
    delay: 4,
    height: 0,
    stagger: {
      amount: 0.5
    },
    ease: "power4.inOut"
  })
  
})
useHead({
  title: 'Utitofon Udoekong | Creative Front End Engineer',

  // viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  // lang: 'en-US',
  // charset: 'utf-8',
  htmlAttrs: {
    lang: 'en-US',
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Hey I’m Simon, a creative front end engineer based in Orlando, Florida. I\'m passionate about creating incredible user experiences with web technology. I specialize in programming with Vue, Nuxt and Electron although I have an extensive full-stack development background. I love writing code but I\'m also experienced in UX consulting, with a keen eye for detail and an understanding of interaction design and best practices. I’ve worked on many projects where I start early in the discovery process, guide and design the UX from the ground up, and then get to work building it.'
    },
    {
      hid: 'theme-color',
      name: 'theme-color',
      content: '#7a4fee'
    },
    {
      hid: 'robots',
      name: 'robots',
      content: 'index, follow'
    },
    {
      hid: 'googlebot',
      name: 'googlebot',
      content: 'index, follow'
    },
    {
      hid: 'og:url',
      name: 'og:url',
      content: 'https://marchantweb.com'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Simon Le Marchant | Creative Front End Engineer'
    },
    {
      hid: 'og:type',
      name: 'og:type',
      content: 'website'
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: 'https://marchantweb.com/cover.jpg'
    },
    {
      hid: 'og:image:alt',
      name: 'og:image:alt',
      content: 'Simon Le Marchant | Creative Front End Engineer'
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: 'Hey I’m Simon, a creative front end engineer based in Orlando, Florida. I\'m passionate about creating incredible user experiences with web technology. I specialize in programming with Vue, Nuxt and Electron although I have an extensive full-stack development background. I love writing code but I\'m also experienced in UX consulting, with a keen eye for detail and an understanding of interaction design and best practices. I’ve worked on many projects where I start early in the discovery process, guide and design the UX from the ground up, and then get to work building it.'
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: 'Simon Le Marchant | Creative Front End Engineer'
    },
    {
      hid: 'og:locale',
      name: 'og:locale',
      content: 'en_US'
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@marchantweb'
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@marchantweb'
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: 'https://marchantweb.com'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Simon Le Marchant | Creative Front End Engineer'
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'Hey I’m Simon, a creative front end engineer based in Orlando, Florida.'
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://marchantweb.com/cover.jpg'
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Simon Le Marchant | Creative Front End Engineer'
    }
  ],
  link: [
    {rel: 'icon', type: 'image/svg', href: '/icon-notext.svg'},
    // {rel: 'preconnect', href: 'https://api.marchantweb.com'},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'},
  ],
  script: [
    {
      src: "https://kit.fontawesome.com/172ddc2486.js", async: true, defer: true
    }
  ],
});
</script>

<template>
  <div class="">
    <section class="pointer-events-none overflow-hidden w-screen h-screen  relative">
      <h1 class="counter fixed w-full h-full flex justify-end items-end z-50">{{ currentValue }}%</h1>
      <!-- <div class="header w-full flex flex-col-reverse items-center justify-center">
          <p class="FN">UTITOFON</p>
          <p class="FN">UDOEKONG</p>
        </div> -->
      <div class="overlay inset-0 fixed w-screen h-screen z-10 flex">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      
    </section>
    <Hero/>
    <RouterView />
    <Cursor />
  </div>
</template>



<style scoped>
@font-face {
  font-family: 'DT Getai Grotesk Display';
  font-style: normal;
  src: local('DT Getai Grotesk Display'), url(@/assets/fonts/DTGetaiGroteskDisplay-Black.ttf) format('truetype');
}
.FN,.SN {
  position: relative;
  font-size: 5em;
  font-family: 'DT Getai Grotesk Display';
  color: var(--vt-c-black);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


</style>

