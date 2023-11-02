
<script setup lang="ts">

useHead({
  title: 'Let\'s Chat - Send an email | Utitofon Udoekong',
  meta: [
    {
      name: 'description',
      content: 'Send an email to talk about your project.'
    }
  ],
  bodyAttrs: {
    class: 'enable-scroll fixed-webgl'
  }
});

</script>
<template>
  <section class="page">

    <div class="container-xxxl">
      <div class="flex flex-wrap mt-0 lg:mt-6 justify-end">
        <div class=" max-w-full md:max-w-[calc(100%-40vw)]  mb-4">
          <NuxtLink class="back-link !text-white mouse-md mt-4 lg:mt-0" to="/"><Icon name="ph:arrow-up-left-bold" size="2em" class="pe-3"/> Back
          </NuxtLink>
          <CodeTag class="mt-5 mb-3">contact</CodeTag>
          <h1 class="mb-4">Let's Chat</h1>
          <p class="mb-4">Feel free to reach out. I'm always happy to chat to discuss ideas, feasibility, schedule,
            things like that. Or if you just have questions or want to say hi, that's cool too.</p>
          <h2 class="mb-7 break-all"><a href="mailto:utitofonudoekong0@gmail.com" target="blank" class="mouse-md"
                                style="color: #7A4FEE">utitofonudoekong0@gmail.com</a></h2>
        </div>
      </div>
    </div>

  </section>
</template>


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
  transform: translateX(10%) translateZ(0);
  transform-origin: right center;
}

#calendar-container {
  height: 700px;
  width: 100%;
}

.back-link {
  color: #212A36;
  position: fixed;
  top: 40px;
  left: 60px;

  @media screen and (max-width: 992px) {
    position: relative;
    top: 0;
    left: 0;
  }
}

.container-xxxl {
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
    min-height: unset;
  }
}

</style>
