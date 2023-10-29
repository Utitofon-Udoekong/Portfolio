<script setup lang="ts">

const Cursor = defineAsyncComponent(() => import("@/components/Cursor.vue"))
const Hero = defineAsyncComponent(() => import("@/components/Hero.vue"))
const currentValue = ref(0)

useHead({
  title: 'Utitofon Udoekong | Creative Software Engineer',

  htmlAttrs: {
    lang: 'en-US',
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Hey I\’m Utitofon, a creative software engineer based in Uyo, Nigeria. I\'m passionate about creating incredible user experiences with web technology. I specialize in programming with , Vuejs, Nuxtjs, and Flutter, although I have an extensive full-stack development background. I love writing code, with a keen eye for detail and an understanding of interaction design and best practices. I\’ve worked on many projects where I start early in the discovery process, guide and get to work building the UI.'
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
      content: 'https://utitofon-udoekong.vercel.app'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Utitofon Udoekong | Creative Software Engineer'
    },
    {
      hid: 'og:type',
      name: 'og:type',
      content: 'website'
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: 'https://utitofon-udoekong.vercel.app/cover.jpg'
    },
    {
      hid: 'og:image:alt',
      name: 'og:image:alt',
      content: 'Utitofon Udoekong | Creative Software Engineer'
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: 'Hey I\’m Utitofon, a creative software engineer based in Uyo, Nigeria. I\'m passionate about creating incredible user experiences with web technology. I specialize in programming with , Vuejs, Nuxtjs, and Flutter, although I have an extensive full-stack development background. I love writing code, with a keen eye for detail and an understanding of interaction design and best practices. I\’ve worked on many projects where I start early in the discovery process, guide and get to work building the UI.'
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: 'Utitofon Udoekong | Creative Software Engineer'
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
      content: '@Utitofon-Udoeko1'
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@Utitofon-Udoeko1'
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: 'https://utitofon-udoekong.vercel.app'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Utitofon Udoekong | Creative Ssoftware Engineer'
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'Hey I\’m Utitofon, a creative software engineer based in Uyo, Nigeria. I\'m passionate about creating incredible user experiences with web technology. I specialize in programming with , Vuejs, Nuxtjs, and Flutter, although I have an extensive full-stack development background. I love writing code, with a keen eye for detail and an understanding of interaction design and best practices. I\’ve worked on many projects where I start early in the discovery process, guide and get to work building the UI.'
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://utitofon-udoekong.vercel.app/cover.jpg'
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Utitofon Udoekong | Creative Software Engineer'
    }
  ],
  link: [
    {rel: 'icon', type: 'image/svg', href: '/icon-notext.svg'},
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
    <Hero/>
    <RouterView />
    <Cursor />
  </div>
</template>





