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
        <!-- <li>Electron</li> -->
        <li>WebGL</li>
      </ul>
    </div>
    <div class="mb-3 flex items-center">
      <RouterLink to="https://twitter.com/UtitofonUdoeko1" :external="true" target="_blank" class="mr-4 " aria-label="Find me on Twitter">
        <svg class="text-sm twitter-icon mouse-sm hidden md:inline " title="Find me on Twitter" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M496 109.5a201.8 201.8 0 0 1-56.55 15.3a97.51 97.51 0 0 0 43.33-53.6a197.74 197.74 0 0 1-62.56 23.5A99.14 99.14 0 0 0 348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 0 0 2.54 22.1a280.7 280.7 0 0 1-203-101.3A95.69 95.69 0 0 0 36 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0 1 35.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 0 1-25.94 3.4a94.38 94.38 0 0 1-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0 1 39.5 405.6a203 203 0 0 1-23.5-1.4A278.68 278.68 0 0 0 166.74 448c181.36 0 280.44-147.7 280.44-275.8c0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 0 0 496 109.5Z"/></svg>
      </RouterLink>
      <RouterLink to="https://github.com/Utitofon-Udoekong" :external="true" target="_blank" class="mr-6" aria-label="View this site on GitHub">
        <svg class="text-sm github-icon mouse-sm hidden md:inline " title="Find me on Github" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
      </RouterLink>
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
