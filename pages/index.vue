<script setup lang="ts">
const heading = "Crafting immersive web experiences through code"
const headingChars = heading.split('');
let navigatingToPortfolio = false;

onMounted(() => {
  preloadRouteComponents('/portfolio');
  useEventListener(document, 'wheel', async (event) => {
    if (event.deltaY > 0 &&!navigatingToPortfolio) {
      navigatingToPortfolio = true;
      navigateTo('/portfolio');
    }
  });
});

</script>

<template>
  <section class="page">
    <NavMenu/>

    <div id="bottom-bar" class="container-xxxl ">
      <div class="flex flex-wrap justify-between items-end">
        <div class="max-w-3xl ">
          <svg class="lead-icon mb-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5 9c1 1.06 1.5 2.394 1.5 4c0 3.466-3.7 4.276-5.5 9c-.667-.575-1-1.408-1-2.5c0-3.482 5-5.29 5-10.5Zm-4-4c1.2 1.238 1.8 2.572 1.8 4c0 4.951-6.045 5.692-4.8 13C9.833 20.84 9 19.173 9 17c0-3.325 5.5-6 5.5-12ZM10 1c1.333 1.667 2 3.167 2 4.5c0 6.25-8.5 8.222-4 16.5c-2.616-.58-4.5-3-4.5-6C3.5 9.5 10 8.5 10 1Z"/></svg>
          <h1 class="visually-hidden">{{ heading }}</h1>
          <h1 class="mouse-lg lead" v-once>
            <span class="heading-char mouse-lg font-extrabold" aria-hidden="true"
                  :style="{'animation-delay': (index % 5 === 0 ? 0.7 : 0.005 * index) + 's'}"
                  v-for="(char, index) in headingChars">{{ char }}
            </span>
          </h1>
          <div class="md:hidden">
          <ActionButton to="/portfolio" data-aos="fade-right" class="mt-4 mb-4 ">
            <p>Explore</p> <i class="fa-sharp fa-solid fa-arrow-right-long fa-lg ps-2"></i>
          </ActionButton>
          </div>
          <div class="flex items-center mt-5">
            <NuxtLink class="back-link mouse-md inline-block lg:hidden mr-5" to="/about">About
              <Icon name="ph:arrow-up-right-bold" class="ps-2" size="1.125rem"/>
            </NuxtLink>
            <NuxtLink class="back-link mouse-md lg:hidden" to="/contact">Contact<Icon name="ph:arrow-up-right-bold" class="ps-2" size="1.125rem"/></NuxtLink>
            <!-- <NuxtLink class="back-link mouse-md inline-block lg:hidden" to="/projects">Projects<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M204 64v104a12 12 0 0 1-24 0V93L72.49 200.49a12 12 0 0 1-17-17L163 76H88a12 12 0 0 1 0-24h104a12 12 0 0 1 12 12Z"/></svg></NuxtLink> -->
          </div>
          <StatusIndicator class="block lg:hidden mt-1 lg:mt-0 py-3"/>
        </div>
        <ScrollHint/>
      </div>
      <BottomBar/>
    </div>
  
  </section>
  
  
</template>
<style lang="scss" scoped>

* {
  user-select: none;
  -webkit-user-select: none;
}
@font-face {
  font-family: 'DT Getai Grotesk Display';
  font-style: normal;
  src: local('DT Getai Grotesk Display'), url(@/assets/fonts/DTGetaiGroteskDisplay-Black.ttf) format('truetype');
}
.visually-hidden{
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.lead {
  color: #F2F2F2;
  user-select: none;
  text-shadow: -1px 0 0 rgb(44, 191, 217), 1px 0 0 rgb(239, 9, 105), 0px 2px 0 rgb(91, 48, 246);
  transition: text-shadow 0.1s ease-in-out;
  font-family: 'DT Getai Grotesk Display';
  @media screen and (max-width: 992px) {
    text-shadow: none;
  }

  span {
    pointer-events: none;
    color: #F2F2F2;
    user-select: none;
  }
}

.lead-icon {
  color: #F2F2F2;
  font-size: 40px;
  text-shadow: 0 22px 30px rgba(0, 0, 0, 0.2), 2px 2px 1px rgba(206, 89, 55, 0);
  animation: leadIconAnimation 1s ease-in-out forwards;
  animation-delay: 1s;
  opacity: 0;
  transform: translateX(20px);

  @media screen and (max-width: 992px) {
    font-size: 28px;
    font-weight: 400 !important;
  }
}

@keyframes leadIconAnimation {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.heading-char {
  display: inline;
  opacity: 0;
  animation: headingCharReveal 2.8s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}

@keyframes headingCharReveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>