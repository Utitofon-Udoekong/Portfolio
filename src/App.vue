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

.bar {
  width: 10vw;
  height: 105vh;
  background: #f1f1f1;
}

.counter {
  font-family: 'DT Getai Grotesk Display';
  color: var(--vt-c-black);
  padding: 0.2em 0.4em;
  font-size: 5em;
}
</style>

