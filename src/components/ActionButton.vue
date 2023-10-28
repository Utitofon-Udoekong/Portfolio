<template>
  <a :href="props.to" class="action-button mouse-md" target="_blank">
    <slot/>
  </a>
</template>

<script setup lang="ts">

const props = defineProps({
  to: {
    type: String,
    required: true
  },
})

</script>

<style lang="scss" scoped>

.action-button{
  background-color: #1bbe8d;
  border: none;
  padding: 15px 45px;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;
  border-radius: 5px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: rgba(50, 50, 93, 0.25) 0 11px 5px -6px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  p{
    font-size: 1rem;
    color: white;
    text-align: center;
    font-weight: 600;
  }

  &:hover{
    background-color: #1E1F22;
    transform: translateY(-5px);
    box-shadow: rgba(50, 50, 93, 0.15) 0 14px 10px 0;
  }

  :deep(i){
    pointer-events: none;
    margin-right: 10px;
    display: inline-block;
  }
}

</style>
