<script setup>

const props = defineProps({
  src: {type: String},
})
const fileType = props.src.match(/\.[0-9a-z]+$/i)
const cleanPath = props.src.replace(fileType,'')
const pathArray = cleanPath.split('/')
const folderPath = pathArray[0]
const imagePath = pathArray[1]

const image = ref()
watchEffect(async () => {
  switch (fileType[0]) {
    case '.png':
      image.value = (await import(/* @vite-ignore */ `../assets/images/projects/${folderPath}/${imagePath}.png`)).default
      break;
    case '.jpg':
      image.value = (await import(/* @vite-ignore */ `../assets/images/projects/${folderPath}/${imagePath}.jpg`)).default
      break;
    default:
      console.log(`Sorry, the image component can't recognize the ${fileType} file type just yet.`);
  }
})
</script>

<template>
  <img :src="image" />
</template>