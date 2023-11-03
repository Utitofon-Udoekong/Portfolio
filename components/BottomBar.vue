<template>
  <div class="mb-5 items-end hidden md:flex justify-between">
    <div class="flex items-end" itemscope itemtype="https://schema.org/Person">
      <Logo/>
      <h1 class="bottom-navigation__title ms-4"><span itemprop="name">Utitofon Udoekong</span><br><span itemprop="jobTitle">Creative Front End Engineer</span></h1>
    </div>
    <div class="ms-5 mb-3">
      <ul class="gap-x-4 tech-stack md:gap-x-10">
        <li>Flutter</li>
        <li>Vue</li>
        <li>Nuxt</li>
      </ul>
    </div>
    <div class="mb-3 flex items-center">
      <NuxtLink href="https://twitter.com/UtitofonUdoeko1" :external="true" target="_blank" class="mr-4 " aria-label="Find me on Twitter">
        <Icon name="fa6-brands:x-twitter" class="text-lg twitter-icon mouse-sm hidden md:inline " title="Find me on X(Twitter)"/>
      </NuxtLink>
      <NuxtLink href="https://github.com/Utitofon-Udoekong" :external="true" target="_blank" class="mr-6" aria-label="View this site on GitHub">
        <Icon name="bi:github" class="text-lg github-icon mouse-sm hidden md:inline " title="Find me on Github"/>
      </NuxtLink>
      <NuxtLink href="https://www.linkedin.com/in/utitofon-udoekong" :external="true" target="_blank" class="mr-6" aria-label="View this site on GitHub">
        <Icon name="bi:linkedin" class="text-lg github-icon mouse-sm hidden md:inline " title="Find me on Linkedin"/>
      </NuxtLink>
      <StatusIndicator class="hidden lg:block"/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

.bottom-navigation__title {
  display: block;
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.2px;
  margin-bottom: 12px;
  span{
    color: white;
  }
}

.github-icon, .audio-icon, .twitter-icon {
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  &:hover {
    color: white;
  }
}

</style>
