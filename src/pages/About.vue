<template>
  <section class="page overflow-x-hidden">

    <div class="max-w-2xl">
      <div class="flex mt-0 lg:mt-6">
        <main class="" itemscope itemtype="https://schema.org/Person">
          <div class="mb-4">
            <RouterLink class="back-link mouse-md mt-4 lg:mt-0 mb-5 lg:mb-0 d-block text-end text-md-start" to="/">
              Back<svg class="text-2xl font-bold ps-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                viewBox="0 0 16 16">
                <path fill="currentColor" fill-rule="evenodd"
                  d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
              </svg>
            </RouterLink>
            <CodeTag class="mt-5 mb-5 hidden lg:block">about</CodeTag>
            <div class="flex flex-row items-center mb-5">
              <!-- <img src="~assets/images/headshot.png" alt="Hey I'm Simon" class="headshot me-4 me-lg-5"> -->
              <div>
                <h1 class="mb-1" itemprop="name">Utitofon Udoekong</h1>
                <StatusIndicator type="dark" />
              </div>
            </div>
            <h2 class="my-4" itemprop="description">Senior software engineer with 4+ years building creative websites,
              interactive
              experiences
              and custom web software.</h2>
            <div itemprop="knowsAbout">
              <p>
                Hey I’m Utitofon, a creative software engineer based in Uyo, Nigeria. I'm passionate about creating
                incredible user experiences with web technology. I specialize in programming with <a
                  href="https://vuejs.org/" target="_blank" class="mouse-sm">Vue</a>,
                <a href="https://nuxt.com/" target="_blank" class="mouse-sm">Nuxt</a>, and <a
                  href="https://flutter.dev/" target="_blank" class="mouse-sm">Flutter</a>,
                although I have an extensive full-stack development background.
              </p>
              <p>
                I love writing code, with a keen eye for detail and an
                understanding of interaction design and best practices. I’ve worked on many projects where I start early
                in
                the discovery process, guide and get to work building the UI.
              </p>
            </div>
            <h3 class="mt-5 mb-4">Clients &amp; Partners</h3>
            <p class="mb-4">
              Over the past 4+ years I've had the opportunity to work alongside some of the most talented people in the
              industry for some incredible clients, such as:
            </p>
          </div>
          <div class="">
            <div class="client-logo__container">
              <div class="client-logo">
                <img src="@/assets/images/clients/anythinghq.png" alt="AnythingHQ logo" class="mouse-md h-10">
              </div>
              <div class="client-logo">
                <img src="@/assets/images/clients/pearl.png" alt="Pearl Muslimah logo" class="mouse-md h-10">
              </div>
              <div class="client-logo">
                <img src="@/assets/images/clients/mocx.png" alt="Mocx logo" class="mouse-md h-10">
              </div>
              <div class="client-logo">
                <img src="@/assets/images/clients/eduma.png" alt="EAcadamy by Kazen logo" class="mouse-md h-10">
              </div>
              <div class="client-logo">
                <img src="@/assets/images/clients/fortfolio.png" alt="Fortfolio logo" class="mouse-md h-10">
              </div>
              <div class="client-logo">
                <img src="@/assets/images/clients/trail.png" alt="Trailblazers logo" class="mouse-md h-10">
              </div>
            </div>
          </div>
          <div class="mb-4 lg:mb-8">
            <h3 class="mt-5 mb-4">Freelancing</h3>
            <p>
              <strong>I specialize in expert development of mobile applications, desktop applications, and full stack programming for agencies that are
                building cutting-edge web and mobile experiences for their clients.</strong> From solo work to supporting your team
              as a technical lead, I'm here to help;
              working efficiently and collaboratively to bring each project to life.
            </p>
            <!-- <p>My hourly rate for work-for-hire <em>(UX design and development)</em> is $180/hr., whereas consulting is
              billed at $225/hr. I’m always happy to provide an estimate for any project following an initial discovery
              call.</p> -->
            <h3 class="mt-5 mb-4">
              Get in Touch
            </h3>
            <p class="mb-5">
              Thanks for reading a little bit about me. I’m always happy to chat and provide any helpful advice that I
              can. You can email at <a
                href="mailto:utitofonudoekong0@gmail.com" class="mouse-sm"
                itemprop="email">utitofonudoekong0@gmail.com</a>.
            </p>
            <ActionButton to="/contact" data-aos="fade-up" class="hidden lg:flex justify-around">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 .951 4.262l-.93 4.537a1 1 0 0 0 1.18 1.18l4.537-.93c1.294.61 2.74.95 4.262.95c5.523 0 10-4.476 10-10c0-5.522-4.477-10-10-10Z"
                  clip-rule="evenodd" />
              </svg>
              Let's Chat
            </ActionButton>
          </div>
        </main>

      </div>
    </div>

  </section>
</template>
  
<script setup lang="ts">
useHead({
  title: 'Hey, I\'m Utitofon | Utitofon Udoekong',
  meta: [
    {
      name: 'description',
      content: 'Senior software engineer with 4+ years building creative websites, interactive experiences and custom web software.'
    }
  ],
  bodyAttrs: {
    class: 'enable-scroll fixed-webgl'
  }
});

</script>
  
<style lang="scss" scoped>
.page-enter-active {
  transition: all 1.5s cubic-bezier(0.4, 0, 0, 1);
  transition-delay: 0.5s;
}

.page-leave-active {
  transition: all 1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-10%) translateZ(0);
  transform-origin: left center;
}

.client-logo__container {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, minmax(100px,100px));

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  &:hover {
    .client-logo:not(:hover) {
      opacity: 0.2;
    }
  }
}

.client-logo {
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: #ffffff;
  offset: 10px 30px;
  display: grid;
  place-items: center;
}

.back-link {
  color: #bec5cf;
  position: fixed;
  top: 40px;
  right: 60px;

  @media screen and (max-width: 992px) {
    position: relative;
    top: 0;
    left: 0;
  }
}

</style>
  