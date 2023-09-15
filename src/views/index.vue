<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue';
import ActionButton from '@/components/ActionButton.vue'
import BottomBar from '@/components/BottomBar.vue'
import ScrollHint from '@/components/ScrollHint.vue'
import gsap from 'gsap';
const heading = "Unlocking Innovation: Explore My Software Engineering Journey"
const headingChars = heading.split('');

</script>

<template>
  <div>
    <NavMenu/>

    <div class="fixed bottom-0 inset-x-0 max-w-7xl mx-12">
      <div class="flex gap-x-4 mb-3 lg:mb-5 xl:mb-6 justify-between items-end">
        <div class="max-w-4xl w-full">
          <svg class="lead-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5 9c1 1.06 1.5 2.394 1.5 4c0 3.466-3.7 4.276-5.5 9c-.667-.575-1-1.408-1-2.5c0-3.482 5-5.29 5-10.5Zm-4-4c1.2 1.238 1.8 2.572 1.8 4c0 4.951-6.045 5.692-4.8 13C9.833 20.84 9 19.173 9 17c0-3.325 5.5-6 5.5-12ZM10 1c1.333 1.667 2 3.167 2 4.5c0 6.25-8.5 8.222-4 16.5c-2.616-.58-4.5-3-4.5-6C3.5 9.5 10 8.5 10 1Z"/></svg>
          <p class="invisible">{{ heading }}</p>
          <p class="mouse-lg text-6xl" v-once>
            <span class="heading-char mouse-lg font-extrabold" aria-hidden="true"
                  :style="{'animation-delay': (index % 5 === 0 ? 0.7 : 0.005 * index) + 's'}"
                  v-for="(char, index) in headingChars">{{ char }}
            </span>
          </p>
          <ActionButton to="/portfolio" data-aos="fade-right" class="flex justify-around lg:hidden mt-4 mb-4">
            Explore <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
          </ActionButton>
          <RouterLink class="back-link mouse-md inline-block lg:hidden mr-5" to="/about">About<svg class="text-lg pl-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M204 64v104a12 12 0 0 1-24 0V93L72.49 200.49a12 12 0 0 1-17-17L163 76H88a12 12 0 0 1 0-24h104a12 12 0 0 1 12 12Z"/></svg></RouterLink>
          <RouterLink class="back-link mouse-md inline-block lg:hidden" to="/contact">Contact<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M204 64v104a12 12 0 0 1-24 0V93L72.49 200.49a12 12 0 0 1-17-17L163 76H88a12 12 0 0 1 0-24h104a12 12 0 0 1 12 12Z"/></svg></RouterLink>
        </div>
        <ScrollHint/>
      </div>
      <BottomBar/>
    </div>
  
  </div>
  
  
</template>